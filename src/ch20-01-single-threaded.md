## 싱글스레드 웹 서버 구축하기

동작하는 싱글스레드 웹 서버를 만들어 보겠습니다. 시작하기 전에,
웹 서버를 만들기 위해 사용되는 프로토콜에 대한 간단한 개요를
살펴봅시다. 이러한 프로토콜의 세부 사항은 이 책의 범위를 벗어나지만,
간단한 개요만으로도 여러분이 필요로 하는 정보를 제공할 것입니다.

웹 서버에 포함되는 두 개의 주요 프로토콜은 *하이퍼텍스트 전송 프로토콜 (Hypertest Transfer Protocol, HTTP)*
와 *전송 제어 프로토콜 (Transmission Control Protocol, TCP)* 입니다. 두
프로토콜 모두 *요청-응답 프로토콜 (request-response protocol)* 이며, *클라이언트 (client)* 가
요청을 시작하고 *서버 (server)* 가 이 요청을 수신한 다음 클라이언트에게 응답을 제공한다는
의미입니다. 이러한 요청과 응답의 내용은 프로토콜에 의해 정의됩니다.

TCP는 한 서버에서 다른 서버로 정보가 전달되는 방식에 대한 세부 사항을
설명하는 저수준 프로토콜이지만 해당 정보가 무엇인지에 대해서는 명시하지
않습니다. HTTP는 요청과 응답의 내용을 정의함으로써 TCP를 기반으로
구축됩니다. 기술적으로는 다른 프로토콜과 함께 HTTP를 사용할 수 있지만,
대부분의 경우 HTTP는 TCP를 통해 데이터를 전송합니다. 여기서는 TCP와 HTTP
요청 및 응답의 원시 바이트 (raw byte) 로 작업하겠습니다.

### TCP 연결 수신 대기하기

우리의 웹 서버는 TCP 연결을 수신 대기해야 하므로, 이것이 작업할 첫
번째 부분입니다. 표준 라이브러리는 이 작업을 해주는 `std::net`
모듈을 제공합니다. 일반적인 방식으로 새 프로젝트를 만들어 봅시다:

```console
$ cargo new hello
     Created binary (application) `hello` project
$ cd hello
```

이제 예제 20-1의 코드를 *src/main.rs*에 입력하여 시작하세요. 이 코드는
로컬 주소 `127.0.0.1:7878`에서 들어오는 TCP 스트림을 수신 대기할 것입니다.
들어오는 스트림을 받으면 `Connection established!`를 출력합니다.

<span class="filename">파일명: src/main.rs</span>

```rust,no_run
{{#rustdoc_include ../listings/ch20-web-server/listing-20-01/src/main.rs}}
```

<span class="caption">예제 20-1: 들어오는 스트림 수신 대기하기 및
스트림을 받았을 때 메시지 출력하기</span>

`TcpListener`를 사용하면 `127.0.0.1:7878` 주소에서 TCP 연결을 수신 대기할
수 있습니다. 주소에서 콜론 앞부분은 여러분의 컴퓨터를 나타내는 IP 주소이며
(이는 모든 컴퓨터에서 동일하며 저자의 컴퓨터를 특별히 나타내지는 않습니다),
`7878`은 포트입니다. 이 포트를 선택한 이유는 두 가지입니다: 이 포트에서는
일반적으로 HTTP가 허용되지 않으므로 우리의 서버가 여러분의 컴퓨터에서 실행되고
있을지도 모를 다른 웹 서버와 충돌할 가능성이 낮은 점이 하나고, 나머지 하나는
7878이 전화기에서 입력하는 *rust*이기 때문입니다.

이 시나리오에서 `bind` 함수는 새로운 `TcpListener` 인스턴스를 반환한다는
점에서 `new` 함수와 유사하게 작동합니다. 이 함수를 `bind`라고 부르는 이유는
네트워킹에서 수신할 포트에 연결하는 것을 ‘포트에 바인딩한다’라고 하기
때문입니다.

`bind` 함수는 바인딩이 실패할 수 있음을 나타내는 `Result<T, E>`를
반환합니다. 예를 들어 포트 80에 연결하려면 관리자 권한이 필요하므로
(관리자가 아닌 사용자는 1023보다 높은 포트에서만 수신 대기가 가능합니다),
관리자가 아닌 상태에서 포트 80에 연결하려고 하면 바인딩이 작동하지
않습니다. 또한 이를테면 프로그램의 인스턴스를 두 개 실행하여 두 개의
프로그램이 같은 포트를 수신 대기하는 경우에도 바인딩이 작동하지 않습니다.
학습 목적으로 기본 서버를 작성하고 있으므로, 이러한 종류의 에러 처리에
대해 걱정하지 않겠습니다; 그 대신 `unwrap`을 사용하여 에러가 발생하면
프로그램을 중지합니다.

`TcpListener`의 `incoming` 메서드는 스트림 시퀀스(더 구체적으로는
`TcpStream` 타입의 스트림)를 제공하는 반복자를 반환합니다. 하나의
*스트림 (stream)* 이란 클라이언트와 서버 간의 개방형 연결을 나타냅니다.
*연결 (connection)* 이라는 것은 클라이언트가 서버에 연결하고, 서버가
응답을 생성하고, 서버가 연결을 닫는 전체 요청 및 응답 프로세스의
이름입니다. 따라서 `TcpStream`을 읽어 클라이언트가 보낸 내용을 확인한
다음 스트림에 응답을 작성하여 클라이언트에게 데이터를 다시 보낼
것입니다. 전체적으로 이 `for` 루프는 각 연결을 차례대로 처리하여
우리가 취급할 일련의 스트림을 생성합니다.

현재의 스트림 처리는 스트림에 에러가 있는 경우 'unwrap'을
호출하여 프로그램을 종료합니다; 에러가 없으면 프로그램은 메시지를
출력합니다. 다음 예제에서 성공 사례에 대한 더 많은 기능을
추가하겠습니다. 클라이언트가 서버에 연결할 때 `incoming` 메서드에서
에러가 발생할 수 있는 이유는 실제로는 연결에 대한 반복 작업이
아니기 때문입니다. 대신 *연결 시도*에 대한 반복 작업을 하고
있습니다. 여러 가지 이유로 연결이 성공하지 못할 수 있으며, 그중
대부분은 운영 체제에 따라 다릅니다. 예를 들면, 많은 운영 체제에는
지원 가능한 동시 연결 개수에 제한이 있습니다; 이 개수를 초과하는
새로운 연결을 시도하면 열려 있는 연결 중 일부가 닫힐 때까지
에러가 발생합니다.

이 코드를 실행해 봅시다! 터미널에서 `cargo run`을 호출한 다음 웹
브라우저에서 *127.0.0.1:7878*을 열어보세요. 서버가 현재 데이터를
전송하고 있지 않으므로 브라우저에 ‘연결 재설정 (connection reset)’과
같은 에러 메시지가 표시되어야 합니다. 하지만 터미널을 보면, 브라우저가
서버에 연결되었을 때 출력된 메시지가 몇 개 보일 것입니다!

```text
     Running `target/debug/hello`
Connection established!
Connection established!
Connection established!
```

간혹 하나의 브라우저 요청에 대해 여러 개의 메시지가 출력되는 경우가 있습니다;
그 이유는 브라우저가 페이지를 위한 요청 뿐만 아니라 다른 리소스에 대한 요청,
이를테면 브라우저 탭에 표시되는 *favicon.ico* 아이콘과 같은 리소스를 요청하기
때문입니다.

서버가 아무런 데이터도 응답하지 않고 있으므로 브라우저가 서버에
여러 번 연결을 시도하는 것일 수도 있습니다. `stream`이 스코프를
벗어나 루프의 끝에서 버려지면, `drop` 구현체의 일부에 의해
연결이 닫힙니다. 브라우저는 닫힌 연결을 재시도 처리하기도 하는데,
이 문제가 일시적인 것일 수도 있기 때문입니다. 중요한 것은 TCP 연결에
대한 핸들을 성공적으로 가져왔다는 것입니다!

이 코드의 특정 버전 실행을 끝내려면 <span class="keystroke">ctrl-c</span>를
눌러 프로그램을 중지하는 것을 기억하세요. 그런 다음 각각의 코드 세트를 변경한
후 `cargo run` 명령을 호출하여 프로그램을 다시 시작하고 최신 코드가
실행되고 있는지 확인하세요.

### 요청 읽기

브라우저로부터의 요청을 읽는 기능을 구현해 봅시다! 먼저 연결을
받은 다음 연결에 대해 어떤 조치를 취하는 문제를 분리하기 위해,
연결 처리를 위한 새로운 함수를 시작하겠습니다. 이 새로운
`handle_connection` 함수에서는 TCP 스트림에서 데이터를 읽고
출력하여 브라우저에서 전송되는 데이터를 볼 수 있도록 하겠습니다.
코드를 예제 20-2와 같이 변경하세요.

<span class="filename">파일명: src/main.rs</span>

```rust,no_run
{{#rustdoc_include ../listings/ch20-web-server/listing-20-02/src/main.rs}}
```

<span class="caption">예제 20-2: `TcpStream`을 읽고 데이터
출력하기</span>

스트림에서 읽고 쓸 수 있는 트레잇과 타입에 접근하기 위해서
`std::io::prelude`와 `std::io::BufReader`를 스코프에 가져옵니다.
`main` 함수의 `for` 루프에서 연결되었다는 메시지를 출력하는 대신,
이제 새로운 `handle_connection` 함수를 호출하고 `stream`을
전달합니다.

`handle_connection` 함수에서는 `stream`에 대한 가변 참조자를 감싼
새로운 `BufReader` 인스턴스를 생성합니다. `BufReader`는 `std::io::Read`
트레잇 메서드에 대한 호출을 관리하는 것으로 버퍼링을 추가합니다.

브라우저가 서버로 보낸 요청의 라인들을 수집하기 위해서 `http_request`라는
변수를 생성합니다. `Vec<_>` 타입 명시를 추가함으로써 이 라인들을
벡터로 수집하려 함을 나타냅니다.

`BufReader`는 `std::io::BufRead` 트레잇을 구현하는데, 이 트레잇이 `lines`
메서드를 제공합니다. 이 `lines` 메서드는 새로운 줄 바꿈 바이트가 발견될
때마다 데이터 스트림을 분할함으로써 `Result<String, std::io::Error>`의
반복자를 반환합니다. 각 `String`을 얻기 위해서 각 `Result`를 매핑하고
`unwrap`합니다. 데이터가 유효한 UTF-8이 아니거나 스트림에서 읽는 데 문제가
있는 경우 `Result`는 에러가 될 수 있습니다. 다시 한번 말하지만, 프로덕션
프로그램에서는 이러한 에러를 더 우아하게 처리해야 하지만, 여기서는 단순화를
위해 에러 발생 시 프로그램의 중지 쪽을 선택하고 있습니다.

브라우저는 두 개의 줄 바꿈 문자를 연속으로 전송하여 HTTP 요청의
끝을 알리기 때문에, 스트림으로부터 하나의 요청을 가져오기 위해서는
빈 문자열이 될 때까지 라인을 가져옵니다. 라인들을 벡터에 수집한
다음에는 예쁜 디버그 형식을 사용하여 이들을 출력함으로써 웹
브라우저가 서버로 보내는 명령을 살펴볼 수 있도록 합니다.

이 코드를 실행해 봅시다! 프로그램을 시작하고 다시 웹 브라우저에서
요청을 해보세요. 브라우저에는 여전히 에러 페이지가 나타나지만,
터미널의 프로그램 출력은 이제 아래와 유사하게 표시됩니다:

```console
$ cargo run
   Compiling hello v0.1.0 (file:///projects/hello)
    Finished dev [unoptimized + debuginfo] target(s) in 0.42s
     Running `target/debug/hello`
Request: [
    "GET / HTTP/1.1",
    "Host: 127.0.0.1:7878",
    "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:99.0) Gecko/20100101 Firefox/99.0",
    "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language: en-US,en;q=0.5",
    "Accept-Encoding: gzip, deflate, br",
    "DNT: 1",
    "Connection: keep-alive",
    "Upgrade-Insecure-Requests: 1",
    "Sec-Fetch-Dest: document",
    "Sec-Fetch-Mode: navigate",
    "Sec-Fetch-Site: none",
    "Sec-Fetch-User: ?1",
    "Cache-Control: max-age=0",
]
```

브라우저에 따라 약간 다른 출력이 표시될 수 있습니다. 이제 요청
데이터를 인쇄하고 있으므로, 요청 첫 줄의 `GET` 뒤의 경로를 보면
하나의 브라우저 요청으로부터 여러 개의 연결이 발생한 이유를 알
수 있습니다. 반복되는 연결이 모두 */*를 요청하면, 브라우저가
우리의 프로그램으로부터 응답을 받지 못해 */*를 반복해서 가져오려고
한다는 것을 알 수 있습니다.

이 요청 데이터를 분해하여 브라우저가 우리 프로그램에게 무엇을 요청하는지
이해해 봅시다.

### HTTP 요청 자세히 살펴보기

HTTP는 텍스트 기반 프로토콜이며, 요청은 다음의 형식을 취합니다:

```text
Method Request-URI HTTP-Version CRLF
headers CRLF
message-body
```

첫 번째 라인은 클라이언트가 요청하는 내용에 대한 정보를 담고 있는
*요청 라인*입니다. 요청 라인의 첫 번째 부분은 `GET`이나 `POST`와
같이 사용 중인 *메서드*를 나타내는데, 이는 클라이언트가 이 요청을 하는
방법을 설명합니다. 지금의 클라이언트는 `GET` 요청을 사용했는데, 이는
정보를 요청한다는 의미입니다.

요청 라인의 다음 부분은 */*로, 클라이언트가 요청하는 *통합 자원 식별자 (Uniform Resource Identifier)*
*(URI)*를 나타냅니다: URI는 *통합 자원 위치 (Uniform Resoruce Locator)*
*(URL)*와 거의 같지만 완전히 같지는 않습니다. URI와 URL의 차이점은
이 장에서의 우리 목적에 중요한 사항은 아니지만, HTTP 스펙에서는 URI라는
용어를 사용하므로, 여기서는 그냥 URI 대신 URL로 대체할 수 있습니다.

마지막 부분은 클라이언트가 사용하는 HTTP 버전이며, 요청 라인은
*CRLF 시퀀스*로 끝납니다. (CRLF는 *캐리지 리턴 (carriage return)* 과
*라인 피드 (line feed)* 의 약자로, 타자기 시절의 용어입니다!)
CRLF 시퀀스는 `\r\n`이라고도 쓸 수 있는데, 여기서 `\r`은 캐리지 리턴이고
`\n`은 줄 바꿈입니다. CRLF 시퀀스는 요청 라인을 나머지 요청 데이터와 분리합니다.
CRLF가 출력될 때 `\r\n`이 출력되는 게 아니라 새 줄이 시작된다는 점을 유의하세요.

지금까지 프로그램을 실행하여 받은 요청 라인 데이터를 살펴보면,
`GET`은 메서드, */*는 요청 URI, `HTTP/1.1`은 버전임을 알 수
있습니다.

요청 라인 다음에 `Host:`부터 시작하는 나머지 줄은 헤더입니다.
GET` 요청에는 본문이 없습니다.

다른 브라우저로 요청하거나 *127.0.0.1:7878/test*와 같은 다른 주소로
요청하면서 요청 데이터가 어떻게 변경되는지 확인해 보세요.

이제 브라우저가 무엇을 요청하는지 알았으니, 데이터를 보내봅시다!

### 응답 작성하기

클라이언트 요청에 대한 응답으로 데이터 전송을 구현해 보겠습니다.
응답의 형식은 다음과 같습니다:

```text
HTTP-Version Status-Code Reason-Phrase CRLF
headers CRLF
message-body
```

첫 번째 라인은 응답에 사용된 HTTP 버전, 요청 결과를
요약하는 숫자 상태 코드, 상태 코드에 대한 텍스트 설명을
제공하는 이유 문구 (reason phrase) 가 들어있는 *상태 라인*
입니다. CRLF 시퀀스 뒤에는 헤더, 또 다른 CRLF 시퀀스, 응답
본문이 있습니다.

다음은 HTTP 버전 1.1을 사용하고, 상태 코드가 200이며, OK라는 이유 문구가 있고,
헤더와 본문이 없는 응답의 예입니다:

```text
HTTP/1.1 200 OK\r\n\r\n
```

상태 코드 200은 표준 성공 응답입니다. 텍스트는 작은 HTTP
성공 응답입니다. 이것을 요청 성공에 대한 응답으로 스트림에
작성해 봅시다! `handle_connection` 함수에서 요청 데이터를
출력했던 `println!`을 제거하고 예제 20-3의 코드로
바꾸세요.

<span class="filename">파일명: src/main.rs</span>

```rust,no_run
{{#rustdoc_include ../listings/ch20-web-server/listing-20-03/src/main.rs:here}}
```

<span class="caption">예제 20-3: 작은 HTTP 성공 응답을 스트림에
작성하기</span>

새롭게 작성한 첫 번째 라인은 성공 메시지의 데이터를 담고 있는 `response`
변수를 정의합니다. 그런 다음 `response`에서 `as_bytes`를 호출하여 문자열
데이터를 바이트로 변환합니다. `stream`의 `write_all` 메서드는 `&[u8]`을
받아 해당 바이트를 연결 쪽으로 직접 보냅니다. `write_all` 작업이 실패할
수 있으므로, 전과 같이 에러 결과에 `unwrap`을 사용합니다. 다시 말하지만,
실제 애플리케이션이라면 여기에서 에러 처리를 추가할 것입니다.

이렇게 변경한 코드를 실행하고 요청을 해봅시다. 더 이상 터미널에는
데이터를 출력하지 않으므로, 카고의 출력 이외의 다른 출력은 표시되지
않습니다. 웹 브라우저에서 *127.0.0.1:7878*을 로드하면, 에러 대신 빈
페이지가 나와야 합니다. 여러분은 방금 HTTP 요청을 수신하고 응답을
보내는 것을 직접 코딩한 것입니다!

### 실제 HTML 반환하기

빈 페이지 그 이상의 것을 반환하는 기능을 구현해 봅시다. *src* 디렉터리
말고 프로젝트 루트 디렉터리에 *hello.html* 파일을 새로 만듭니다.
여러분이 원하는 HTML을 여기 입력할 수 있습니다; 예제 20-4는
한 가지 예시를 보여줍니다.

<span class="filename">파일명: hello.html</span>

```html
{{#include ../listings/ch20-web-server/listing-20-05/hello.html}}
```

<span class="caption">예제 20-4: 응답에 넣기 위한 샘플
HTML 파일</span>

이것은 제목과 약간의 텍스트가 포함된 최소한의 HTML5 문서입니다. 요청이
수신될 때 서버에서 이걸 반환하기 위해서 예제 20-5에 나온 것처럼
`handle_connection`을 수정하여 HTML 파일을 읽고 응답에 본문으로 추가한
후 전송하겠습니다.

<span class="filename">파일명: src/main.rs</span>

```rust,no_run
{{#rustdoc_include ../listings/ch20-web-server/listing-20-05/src/main.rs:here}}
```

<span class="caption">예제 20-5: *hello.html*의 내용을 응답의
본문으로 보내기</span>

`use` 구문에 `fs`를 추가하여 표준 라이브러리의 파일 시스템 모듈을
스코프 안으로 가져왔습니다. 파일의 내용을 문자열로 읽는 코드는
익숙할 것입니다; 12장 I/O 프로젝트의 예제 12-4에서 파일
내용을 읽을 때 이 코드를 사용했습니다.

다음으로 `format!`을 사용하여 파일의 내용을 성공 응답의 본문으로
추가합니다. 유효한 HTTP 응답을 보장하기 위해 응답 본문의
크기(위의 경우 `hello.html`의 크기)로 설정된 `Content-Length`
헤더를 추가합니다.

이 코드를 `cargo run`으로 실행하고 웹 브라우저에서 *127.0.0.1:7878*을 로드하세요;
여러분의 HTML이 렌더링된 것을 볼 수 있을 겁니다!

현재는 `http_request`의 요청 데이터를 무시하고 무조건 이 HTML
파일의 내용만 전송하고 있습니다. 이 말은 즉 브라우저에서
*127.0.0.1:7878/something-else*를 요청해도, 여전히 동일한 HTML 응답을
받게 된다는 뜻입니다. 현시점에서 우리의 서버는 매우 제한적이며 대부분의
웹 서버가 수행하는 작업을 수행하지 않습니다. 요청에 따라 응답을
커스터마이징하고 제대로 된 형식의 */* 요청에 대해서만 HTML 파일을
돌려보내고자 합니다.

### 요청의 유효성 검사와 선택적 응답

현재 우리의 웹 서버는 클라이언트가 무엇을 요청하든 파일에 있는
HTML을 반환합니다. HTML 파일을 반환하기 전에 브라우저가 */*를
요청하고 있는지 확인하고 브라우저가 다른 것을 요청하면 오류를 반환하는
기능을 추가해 봅시다. 이를 위해 예제 20-6에 나온 것처럼 `handle_connection`을
수정할 필요가 있습니다. 이 새로운 코드는 알고 있는 */*에 대한 요청의
생김새와 수신된 요청의 내용을 비교 검사하고 요청을 다르게 처리하기 위해
`if`와 `else` 블록을 추가합니다.

<span class="filename">파일명: src/main.rs</span>

```rust,no_run
{{#rustdoc_include ../listings/ch20-web-server/listing-20-06/src/main.rs:here}}
```

<span class="caption">예제 20-6: */*에 대한 요청과 다른 요청을
다르게 처리하기</span>

HTTP 요청의 첫 번째 라인만 살펴볼 것이므로, 전체 요청을 벡터로
읽는 대신 `next`를 호출하여 반복자에서 첫 번째 아이템을
가져옵니다. 첫 번째 `unwrap`은 `Option`을 처리하고 반복자에
아이템이 없으면 프로그램을 중지시킵니다. 두 번째 `unwrap`은
`Result`를 처리하며 예제 20-2에 추가된 `map`에 있던 `unwrap`과
동일한 효과를 갖습니다.

다음으로 `request_line`을 검사하여 이것이 */* 경로에 대한 GET 요청
라인과 일치하는지 확인합니다. 만일 그렇다면 `if` 블록은 HTML 파일의 내용을
반환합니다.

만약 `request_line`이 */* 경로에 대한 GET 요청 라인과 일치하지
않는다면, 이는 다른 요청을 받았다는 것을 의미합니다.  다른 모든 요청에
대한 응답을 하기 위해 `else` 블록에 코드를 추가하겠습니다.

이제 이 코드를 실행하고 *127.0.0.1:7878*를 요청해 보세요; *hello.html*의
HTML이 나올 것입니다. 만일 *127.0.0.1:7878/something-else*과 같은
다룬 요청을 한다면, 예제 20-1과 예제 20-2에서 실행했을 때
보았던 연결 에러가 나타날 것입니다.

이제 요청에 대한 내용을 찾을 수 없다는 것을 나타내는 신호인 상태
코드 404를 반환하기 위해서, 예제 20-7의 코드를 `else` 블록에
추가해 봅시다. 브라우저에서 렌더링하여 최종 사용자에 대한 응답을
나타내는 HTML 페이지도 반환하겠습니다.

<span class="filename">파일명: src/main.rs</span>

```rust,no_run
{{#rustdoc_include ../listings/ch20-web-server/listing-20-07/src/main.rs:here}}
```

<span class="caption">예제 20-7: */* 이외의 요청이 들어올 때
상태 코드 404와 에러 페이지로 응답하기</span>

여기서 응답에는 상태 코드 404와 `NOT FOUND`이라는 이유 문구가 있는 상태
라인이 있습니다. 응답 본문은 *404.html* 파일에 있는 HTML이 될 것입니다.
에러 페이지의 *hello.html*과 같은 위치에 *404.html* 파일을 만들어야 합니다;
다시 한번 말하지만, 원하는 HTML을 사용해도 되고 예제 20-8의 예제 HTML을
사용해도 됩니다.

<span class="filename">파일명: 404.html</span>

```html
{{#include ../listings/ch20-web-server/listing-20-07/404.html}}
```

<span class="caption">예제 20-8: 모든 404 응답과 함께 보내지는
페이지를 위한 샘플 내용</span>

이 변경을 적용하여 서버를 다시 실행하세요. *127.0.0.1:7878*을 요청하면
*hello.html* 내용이 반환되어야 하며, *127.0.0.1:7878/foo* 같은 다른
모든 요청에 대해서는 *404.html*으로부터 나온 에러 HTML이 반환되어야 합니다.

### 리팩터링

현재 `if` 및 `else` 블록에는 많은 반복이 있습니다: 둘 다
파일을 읽고 파일 내용을 스트림에 작성하고 있습니다. 유일한
차이점은 상태 표시줄과 파일 이름뿐입니다. 이러한 차이점을
상태 라인과 파일 이름의 값을 변수에 할당하는 별도의 `if`와
`else` 라인으로 분리하여 코드를 더 간결하게 만들어 봅시다;
그렇게 하면 파일을 읽고 응답을 작성하는 코드에서 해당 변수를
조건에 상관없이 사용할 수 있습니다. 예제 20-9는 거대한
`if`와 `else` 블록을 교체한 후의 코드를 보여줍니다.

<span class="filename">파일명: src/main.rs</span>

```rust,no_run
{{#rustdoc_include ../listings/ch20-web-server/listing-20-09/src/main.rs:here}}
```

<span class="caption">예제 20-9: 두 경우의 차이에 대한 코드만 담은
`if`와 `else` 블록으로 리팩터링하기</span>

이제 `if`와 `else` 블록은 상태 라인과 파일 이름에 대한
적절한 값만 튜플로 반환합니다; 그런 다음 18장에서 설명한 것처럼
`let` 구문의 패턴을 사용하여 이 두 값을 `status_line`과
`filename`에 할당하기 위해 해체를 사용합니다.

이전의 중복된 코드는 이제 `if`와 `else` 블록 외부에 있으며
`status_line`과 `filename` 변수를 사용합니다. 이렇게 하면
두 경우의 차이를 더 쉽게 확인할 수 있으며, 이는 파일 읽기와
응답 작성하기의 작동 방식을 변경하려는 경우 코드를 업데이트할
위치가 한 곳뿐이라는 의미입니다. 예제 20-9의 코드 동작은
예제 20-8의 코드 동작과 동일합니다.

멋지군요! 이제 하나의 요청에 대해서는 콘텐츠 페이지로 응답하고, 다른
모든 요청에는 404 응답으로 응답하는 약 40라인의 러스트 코드로 구성된
간단한 웹 서버가 생겼습니다.

현재 우리의 서버는 스레드 하나로 실행되므로, 한 번에 하나의 요청만
처리할 수 있습니다. 느린 요청을 시뮬레이션하여 이것이 어떻게 문제가
될 수 있는지 살펴봅시다. 그런 다음 서버가 한 번에 여러 요청을 처리할
수 있도록 수정해 보겠습니다.
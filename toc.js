// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><a href="title-page.html">The Rust Programming Language</a></li><li class="chapter-item expanded affix "><a href="foreword.html">들어가기에 앞서</a></li><li class="chapter-item expanded affix "><a href="ch00-00-introduction.html">소개</a></li><li class="chapter-item expanded "><a href="ch01-00-getting-started.html"><strong aria-hidden="true">1.</strong> 시작해봅시다</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch01-01-installation.html"><strong aria-hidden="true">1.1.</strong> 러스트 설치</a></li><li class="chapter-item expanded "><a href="ch01-02-hello-world.html"><strong aria-hidden="true">1.2.</strong> Hello, World!</a></li><li class="chapter-item expanded "><a href="ch01-03-hello-cargo.html"><strong aria-hidden="true">1.3.</strong> 카고를 사용해봅시다</a></li></ol></li><li class="chapter-item expanded "><a href="ch02-00-guessing-game-tutorial.html"><strong aria-hidden="true">2.</strong> 추리 게임</a></li><li class="chapter-item expanded "><a href="ch03-00-common-programming-concepts.html"><strong aria-hidden="true">3.</strong> 일반적인 프로그래밍 개념</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch03-01-variables-and-mutability.html"><strong aria-hidden="true">3.1.</strong> 변수와 가변성</a></li><li class="chapter-item expanded "><a href="ch03-02-data-types.html"><strong aria-hidden="true">3.2.</strong> 데이터 타입</a></li><li class="chapter-item expanded "><a href="ch03-03-how-functions-work.html"><strong aria-hidden="true">3.3.</strong> 함수</a></li><li class="chapter-item expanded "><a href="ch03-04-comments.html"><strong aria-hidden="true">3.4.</strong> 주석</a></li><li class="chapter-item expanded "><a href="ch03-05-control-flow.html"><strong aria-hidden="true">3.5.</strong> 제어 흐름문</a></li></ol></li><li class="chapter-item expanded "><a href="ch04-00-understanding-ownership.html"><strong aria-hidden="true">4.</strong> 소유권 이해하기</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch04-01-what-is-ownership.html"><strong aria-hidden="true">4.1.</strong> 소유권이 뭔가요?</a></li><li class="chapter-item expanded "><a href="ch04-02-references-and-borrowing.html"><strong aria-hidden="true">4.2.</strong> 참조와 대여</a></li><li class="chapter-item expanded "><a href="ch04-03-slices.html"><strong aria-hidden="true">4.3.</strong> 슬라이스</a></li></ol></li><li class="chapter-item expanded "><a href="ch05-00-structs.html"><strong aria-hidden="true">5.</strong> 구조체로 연관된 데이터를 구조화하기</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch05-01-defining-structs.html"><strong aria-hidden="true">5.1.</strong> 구조체 정의 및 인스턴트화</a></li><li class="chapter-item expanded "><a href="ch05-02-example-structs.html"><strong aria-hidden="true">5.2.</strong> 구조체를 사용한 예제 프로그램</a></li><li class="chapter-item expanded "><a href="ch05-03-method-syntax.html"><strong aria-hidden="true">5.3.</strong> 메서드 문법</a></li></ol></li><li class="chapter-item expanded "><a href="ch06-00-enums.html"><strong aria-hidden="true">6.</strong> 열거형과 패턴 매칭</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch06-01-defining-an-enum.html"><strong aria-hidden="true">6.1.</strong> 열거형 정의하기</a></li><li class="chapter-item expanded "><a href="ch06-02-match.html"><strong aria-hidden="true">6.2.</strong> match 제어 흐름 구조</a></li><li class="chapter-item expanded "><a href="ch06-03-if-let.html"><strong aria-hidden="true">6.3.</strong> if let을 사용한 간결한 제어 흐름</a></li></ol></li><li class="chapter-item expanded "><a href="ch07-00-managing-growing-projects-with-packages-crates-and-modules.html"><strong aria-hidden="true">7.</strong> 커져 가는 프로젝트를 패키지, 크레이트, 모듈로 관리하기</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch07-01-packages-and-crates.html"><strong aria-hidden="true">7.1.</strong> 패키지와 크레이트</a></li><li class="chapter-item expanded "><a href="ch07-02-defining-modules-to-control-scope-and-privacy.html"><strong aria-hidden="true">7.2.</strong> 모듈을 정의하여 스코프 및 공개 여부 제어하기</a></li><li class="chapter-item expanded "><a href="ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html"><strong aria-hidden="true">7.3.</strong> 경로를 사용하여 모듈 트리의 아이템 참조하기</a></li><li class="chapter-item expanded "><a href="ch07-04-bringing-paths-into-scope-with-the-use-keyword.html"><strong aria-hidden="true">7.4.</strong> use 키워드로 경로를 스코프 안으로 가져오기</a></li><li class="chapter-item expanded "><a href="ch07-05-separating-modules-into-different-files.html"><strong aria-hidden="true">7.5.</strong> 별개의 파일로 모듈 분리하기</a></li></ol></li><li class="chapter-item expanded "><a href="ch08-00-common-collections.html"><strong aria-hidden="true">8.</strong> 일반적인 컬렉션</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch08-01-vectors.html"><strong aria-hidden="true">8.1.</strong> 벡터에 여러 값의 목록 저장하기</a></li><li class="chapter-item expanded "><a href="ch08-02-strings.html"><strong aria-hidden="true">8.2.</strong> 문자열에 UTF-8 텍스트 저장하기</a></li><li class="chapter-item expanded "><a href="ch08-03-hash-maps.html"><strong aria-hidden="true">8.3.</strong> 해시맵에 서로 연관된 키와 값 저장하기</a></li></ol></li><li class="chapter-item expanded "><a href="ch09-00-error-handling.html"><strong aria-hidden="true">9.</strong> 에러 처리</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch09-01-unrecoverable-errors-with-panic.html"><strong aria-hidden="true">9.1.</strong> panic!으로 복구 불가능한 에러 처리하기</a></li><li class="chapter-item expanded "><a href="ch09-02-recoverable-errors-with-result.html"><strong aria-hidden="true">9.2.</strong> Result로 복구 가능한 에러 처리하기</a></li><li class="chapter-item expanded "><a href="ch09-03-to-panic-or-not-to-panic.html"><strong aria-hidden="true">9.3.</strong> panic!이냐, panic!이 아니냐, 그것이 문제로다</a></li></ol></li><li class="chapter-item expanded "><a href="ch10-00-generics.html"><strong aria-hidden="true">10.</strong> 제네릭 타입, 트레이트, 라이프타임</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch10-01-syntax.html"><strong aria-hidden="true">10.1.</strong> 제네릭 데이터 타입</a></li><li class="chapter-item expanded "><a href="ch10-02-traits.html"><strong aria-hidden="true">10.2.</strong> 트레이트로 공통된 동작을 정의하기</a></li><li class="chapter-item expanded "><a href="ch10-03-lifetime-syntax.html"><strong aria-hidden="true">10.3.</strong> 라이프타임으로 참조자의 유효성 검증하기</a></li></ol></li><li class="chapter-item expanded "><a href="ch11-00-testing.html"><strong aria-hidden="true">11.</strong> 자동화 테스트 작성하기</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch11-01-writing-tests.html"><strong aria-hidden="true">11.1.</strong> 테스트 작성 방법</a></li><li class="chapter-item expanded "><a href="ch11-02-running-tests.html"><strong aria-hidden="true">11.2.</strong> 테스트 실행 방법 제어하기</a></li><li class="chapter-item expanded "><a href="ch11-03-test-organization.html"><strong aria-hidden="true">11.3.</strong> 테스트 조직화</a></li></ol></li><li class="chapter-item expanded "><a href="ch12-00-an-io-project.html"><strong aria-hidden="true">12.</strong> I/O 프로젝트: 커맨드 라인 프로그램 만들기</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch12-01-accepting-command-line-arguments.html"><strong aria-hidden="true">12.1.</strong> 커맨드 라인 인수 받기</a></li><li class="chapter-item expanded "><a href="ch12-02-reading-a-file.html"><strong aria-hidden="true">12.2.</strong> 파일 읽기</a></li><li class="chapter-item expanded "><a href="ch12-03-improving-error-handling-and-modularity.html"><strong aria-hidden="true">12.3.</strong> 모듈성과 에러 처리 향상을 위한 리팩터링</a></li><li class="chapter-item expanded "><a href="ch12-04-testing-the-librarys-functionality.html"><strong aria-hidden="true">12.4.</strong> 테스트 주도 개발로 라이브러리 기능 개발하기</a></li><li class="chapter-item expanded "><a href="ch12-05-working-with-environment-variables.html"><strong aria-hidden="true">12.5.</strong> 환경 변수 사용하기</a></li><li class="chapter-item expanded "><a href="ch12-06-writing-to-stderr-instead-of-stdout.html"><strong aria-hidden="true">12.6.</strong> 표준 출력 대신 표준 에러로 에러 메시지 작성하기</a></li></ol></li><li class="chapter-item expanded "><a href="ch13-00-functional-features.html"><strong aria-hidden="true">13.</strong> 함수형 언어의 특성: 반복자와 클로저</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch13-01-closures.html"><strong aria-hidden="true">13.1.</strong> 클로저: 자신의 환경을 캡처하는 익명 함수</a></li><li class="chapter-item expanded "><a href="ch13-02-iterators.html"><strong aria-hidden="true">13.2.</strong> 반복자로 일련의 아이템들 처리하기</a></li><li class="chapter-item expanded "><a href="ch13-03-improving-our-io-project.html"><strong aria-hidden="true">13.3.</strong> I/O 프로젝트 개선하기</a></li><li class="chapter-item expanded "><a href="ch13-04-performance.html"><strong aria-hidden="true">13.4.</strong> 성능 비교하기: 루프 vs. 반복자</a></li></ol></li><li class="chapter-item expanded "><a href="ch14-00-more-about-cargo.html"><strong aria-hidden="true">14.</strong> 카고와 Crates.io 더 알아보기</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch14-01-release-profiles.html"><strong aria-hidden="true">14.1.</strong> 릴리즈 프로필을 통한 빌드 커스터마이징하기</a></li><li class="chapter-item expanded "><a href="ch14-02-publishing-to-crates-io.html"><strong aria-hidden="true">14.2.</strong> Crates.io에 크레이트 배포하기</a></li><li class="chapter-item expanded "><a href="ch14-03-cargo-workspaces.html"><strong aria-hidden="true">14.3.</strong> 카고 작업공간</a></li><li class="chapter-item expanded "><a href="ch14-04-installing-binaries.html"><strong aria-hidden="true">14.4.</strong> cargo install로 Crates.io에 있는 바이너리 설치하기</a></li><li class="chapter-item expanded "><a href="ch14-05-extending-cargo.html"><strong aria-hidden="true">14.5.</strong> 커스텀 명령어로 카고 확장하기</a></li></ol></li><li class="chapter-item expanded "><a href="ch15-00-smart-pointers.html"><strong aria-hidden="true">15.</strong> 스마트 포인터</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch15-01-box.html"><strong aria-hidden="true">15.1.</strong> Box&lt;T&gt;를 사용하여 힙에 있는 데이터 가리키기</a></li><li class="chapter-item expanded "><a href="ch15-02-deref.html"><strong aria-hidden="true">15.2.</strong> Deref 트레이트로 스마트 포인터를 보통의 참조자처럼 취급하기</a></li><li class="chapter-item expanded "><a href="ch15-03-drop.html"><strong aria-hidden="true">15.3.</strong> Drop 트레이트로 메모리 정리 코드 실행하기</a></li><li class="chapter-item expanded "><a href="ch15-04-rc.html"><strong aria-hidden="true">15.4.</strong> Rc&lt;T&gt;, 참조 카운트 스마트 포인터</a></li><li class="chapter-item expanded "><a href="ch15-05-interior-mutability.html"><strong aria-hidden="true">15.5.</strong> RefCell&lt;T&gt;와 내부 가변성 패턴</a></li><li class="chapter-item expanded "><a href="ch15-06-reference-cycles.html"><strong aria-hidden="true">15.6.</strong> 순환 참조는 메모리 누수를 발생시킬 수 있습니다</a></li></ol></li><li class="chapter-item expanded "><a href="ch16-00-concurrency.html"><strong aria-hidden="true">16.</strong> 겁 없는 동시성</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch16-01-threads.html"><strong aria-hidden="true">16.1.</strong> 스레드를 이용하여 코드를 동시에 실행하기</a></li><li class="chapter-item expanded "><a href="ch16-02-message-passing.html"><strong aria-hidden="true">16.2.</strong> 메시지 패싱을 사용하여 스레드 간 데이터 전송하기</a></li><li class="chapter-item expanded "><a href="ch16-03-shared-state.html"><strong aria-hidden="true">16.3.</strong> 공유 상태 동시성</a></li><li class="chapter-item expanded "><a href="ch16-04-extensible-concurrency-sync-and-send.html"><strong aria-hidden="true">16.4.</strong> Sync와 Send 트레이트를 이용한 확장 가능한 동시성</a></li></ol></li><li class="chapter-item expanded "><a href="ch17-00-oop.html"><strong aria-hidden="true">17.</strong> 러스트의 객체 지향 프로그래밍 기능들</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch17-01-what-is-oo.html"><strong aria-hidden="true">17.1.</strong> 객체 지향 언어의 특성</a></li><li class="chapter-item expanded "><a href="ch17-02-trait-objects.html"><strong aria-hidden="true">17.2.</strong> 트레이트 객체를 사용하여 다른 타입의 값 허용하기</a></li><li class="chapter-item expanded "><a href="ch17-03-oo-design-patterns.html"><strong aria-hidden="true">17.3.</strong> 객체 지향 디자인 패턴 구현하기</a></li></ol></li><li class="chapter-item expanded "><a href="ch18-00-patterns.html"><strong aria-hidden="true">18.</strong> 패턴과 매칭</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch18-01-all-the-places-for-patterns.html"><strong aria-hidden="true">18.1.</strong> 패턴이 사용될 수 있는 모든 곳</a></li><li class="chapter-item expanded "><a href="ch18-02-refutability.html"><strong aria-hidden="true">18.2.</strong> 반박 가능성: 패턴이 매칭에 실패할지의 여부</a></li><li class="chapter-item expanded "><a href="ch18-03-pattern-syntax.html"><strong aria-hidden="true">18.3.</strong> 패턴 문법</a></li></ol></li><li class="chapter-item expanded "><a href="ch19-00-advanced-features.html"><strong aria-hidden="true">19.</strong> 고급 기능</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch19-01-unsafe-rust.html"><strong aria-hidden="true">19.1.</strong> 안전하지 않은 러스트</a></li><li class="chapter-item expanded "><a href="ch19-03-advanced-traits.html"><strong aria-hidden="true">19.2.</strong> 고급 트레이트</a></li><li class="chapter-item expanded "><a href="ch19-04-advanced-types.html"><strong aria-hidden="true">19.3.</strong> 고급 타입</a></li><li class="chapter-item expanded "><a href="ch19-05-advanced-functions-and-closures.html"><strong aria-hidden="true">19.4.</strong> 고급 함수와 클로저</a></li><li class="chapter-item expanded "><a href="ch19-06-macros.html"><strong aria-hidden="true">19.5.</strong> 매크로</a></li></ol></li><li class="chapter-item expanded "><a href="ch20-00-final-project-a-web-server.html"><strong aria-hidden="true">20.</strong> 최종 프로젝트: 멀티스레드 웹 서버 구축하기</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="ch20-01-single-threaded.html"><strong aria-hidden="true">20.1.</strong> 싱글스레드 웹 서버 구축하기</a></li><li class="chapter-item expanded "><a href="ch20-02-multithreaded.html"><strong aria-hidden="true">20.2.</strong> 싱글스레드 서버를 멀티스레드 서버로 바꾸기</a></li><li class="chapter-item expanded "><a href="ch20-03-graceful-shutdown-and-cleanup.html"><strong aria-hidden="true">20.3.</strong> 우아한 종료와 정리</a></li></ol></li><li class="chapter-item expanded "><a href="appendix-00.html"><strong aria-hidden="true">21.</strong> 부록</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="appendix-01-keywords.html"><strong aria-hidden="true">21.1.</strong> A - 키워드</a></li><li class="chapter-item expanded "><a href="appendix-02-operators.html"><strong aria-hidden="true">21.2.</strong> B - 연산자와 기호</a></li><li class="chapter-item expanded "><a href="appendix-03-derivable-traits.html"><strong aria-hidden="true">21.3.</strong> C - 파생 가능한 트레이트</a></li><li class="chapter-item expanded "><a href="appendix-04-useful-development-tools.html"><strong aria-hidden="true">21.4.</strong> D - 유용한 개발 도구</a></li><li class="chapter-item expanded "><a href="appendix-05-editions.html"><strong aria-hidden="true">21.5.</strong> E - 에디션</a></li><li class="chapter-item expanded "><a href="appendix-06-translation.html"><strong aria-hidden="true">21.6.</strong> F - 번역본</a></li><li class="chapter-item expanded "><a href="appendix-07-nightly-rust.html"><strong aria-hidden="true">21.7.</strong> G - 러스트가 만들어지는 과정과 ‘Nightly 러스트’</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString();
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);

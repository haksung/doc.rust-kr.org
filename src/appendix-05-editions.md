## 부록 E - 에디션

1장에서 `cargo new` 명령이 *Cargo.toml* 파일에 에디션에 대한 메타데이터를
추가하는 것을 보았습니다. 이 부록에서는 그것이 무엇을 의미하는지에 대해 설명합니다!

러스트 언어와 컴파일러의 릴리즈 주기는 6주이며, 이는 사용자들에게 지속적으로
새로운 기능을 제공함을 의미합니다. 다른 프로그래밍 언어는 더 낮은 빈도로
큰 변경을 배포합니다; 러스트는 더 자주 작은 업데이트를 배포합니다. 어느
순간부터는 이러한 작은 변경들이 합쳐집니다. 하지만 릴리즈마다 돌아보면서
‘와, 러스트 1.10과 러스트 1.31 사이에 러스트가 많이 바뀌었구나!’라고
말하기는 어려울 수 있습니다.

매 2년 혹은 3년마다, 러스트 팀은 새로운 러스트 *에디션*을 출시합니다.
각 에디션은 완전히 업데이트된 문서 및 도구가 포함된 깨끗한 패키지로
출시되는 기능을 제공합니다. 새로운 에디션은 일반적인 6주간의 릴리즈
프로세스의 일부로 출시됩니다.

에디션은 여러 사람에게 여러 목적을 제공합니다:

* 기존 러스트 사용자의 경우, 새 에디션은 점진적인 변경 사항을 이해하기 쉬운
  패키지로 통합하여 제공합니다.
* 비사용자의 경우, 새 에디션은 몇 가지 주요 개선 사항이 적용되었음을 알리는
  신호이며, 이는 러스트를 다시 한번 살펴볼 가치가 있게 합니다.
* 러스트를 개발하는 사람들에게는 새 에디션이 프로젝트 전체를 위한
  결집점을 제공합니다.

이 글을 쓰는 시점에는 세 개의 러스트 에디션이 사용 가능합니다: 러스트 2015, 러스트 2018,
그리고 러스트 2021이지요. 이 책은 러스트 2021 에디션 관용구를 사용하여 작성되었습니다.

*Cargo.toml*의 `edition` 키는 컴파일러가 코드를 컴파일할 때 사용할 에디션을
나타냅니다. 이 키가 존재하지 않으면, 러스트는 역호환성을 위해 `2015`를
에디션 값으로 사용합니다.

각 프로젝트는 기본 2015 에디션이 아닌 다른 에디션을 채택할 수 있습니다.
에디션은 코드에서 식별자와 충돌하는 새 키워드를 포함하는 등 호환되지
않는 변경 사항을 포함할 수 있습니다. 하지만, 그러한 변경 사항을 채택하지
않는다면, 코드는 러스트 컴파일러 버전을 업그레이드하더라도 계속해서
컴파일될 것입니다.

모든 러스트 컴파일러 버전은 해당 컴파일러 릴리즈 이전에 존재했던
모든 에디션을 지원하며, 지원되는 모든 에디션의 크레이트를 서로 링크할
수 있습니다. 에디션 변경은 컴파일러가 초기에 코드를 구문 분석하는 방식에만
영향을 줍니다. 따라서 러스트 2015를 사용 중이고 종속성 중 하나가 러스트 2018을
사용하는 경우, 프로젝트는 컴파일되고 해당 종속성을 사용할 수 있습니다.
프로젝트가 러스트 2018을 사용하고 종속성이 러스트 2015를 사용하는 반대의
상황도 마찬가지입니다.

명확히 말씀드리자면, 대부분의 기능은 모든 버전에서 사용할 수 있습니다. 모든
러스트 에디션을 사용하는 개발자는 새로운 안정 버전이 출시되면 계속해서 개선
사항을 확인할 수 있습니다. 그러나 몇몇 경우, 주로 새로운 키워드가 추가될 경우에
일부 새로운 기능은 이후 버전에서만 사용 가능할 수도 있습니다. 이러한 기능을
활용하려면 에디션을 전환해야 합니다.

더 자세한 내용은 에디션 간의 차이점을 열거하고 `cargo fix`를 통해 코드를
새 에디션으로 자동 업그레이드하는 방법을 설명하는 에디션에 대한 전체 책자인
[*에디션 가이드*](https://doc.rust-lang.org/stable/edition-guide/)를
참조하세요.
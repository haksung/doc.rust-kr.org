## 객체 지향 언어의 특성

객체 지향적인 언어가 반드시 갖춰야 할 기능에 대해 프로그래밍 커뮤니티들은
의견 일치를 보지 못하고 있습니다. 러스트는 OOP도 포함하여 많은
프로그래밍 패러다임에 영향을 받았습니다; 예를 들면, 우리가 13장에서
살펴본 기능인 함수형 프로그래밍에서 온 기능들 말이지요. OOP 언어라면
거의 틀림없이 몇가지 공통적인 특성을 공유하는데, 객체, 캡슐화 및 상속이
있습니다. 이 특성들이 각각 뜻하는 것과 러스트가 이를 지원하는지에
대해 살펴봅시다.

### 객체는 데이터와 동작을 담습니다

흔히 The Gang of Four라고도 불리우는 Enoch Gamma, Richard Helm, Ralph Johnson,
그리고 John Vlissides (Addison-Wesley Professional, 1994)의 책 *Design Patterns:
Elements of Reusable Object-Oriented Software*은 객체 지향 디자인 패턴의 편람입니다.
이 책에서는 OOP를 다음과 같이 정의합니다.

> 객체-지향 프로그램은 객체로 구성된다. *객체*는 데이터 및 이 데이터를
> 활용하는 프로시저를 묶는다. 이 프로시저들은 보통 *메소드* 혹은
> *연산 (operation)* 으로 불린다.

이 정의에 따르면, 러스트는 객체 지향적입니다: 구조체와 열거형은 데이터를 갖고,
`impl` 블럭은 그 구조체와 열거형에 대한 메소드를 제공하죠. 설령 메소드를 갖는
구조체와 열거형을 객체라고 *호칭*하지 않더라도, 그들은 동일한 기능을 수행하며,
이는 Gang of Four의 객체에 대한 정의를 따릅니다.

### 상세 구현을 은닉하는 캡슐화

일반적으로 OOP와 관련된 또다른 면은 캡슐화로, 그 의미는 객체를
이용하는 코드에서 그 객체의 상세 구현에 접근할 수 없게 한다는
것입니다. 따라서, 유일하게 객체와 상호작용하는 방법은 이것의
공개 API를 통하는 것입니다; 객체를 사용하는 코드는 직접 객체의
내부에 접근하여 데이터나 동작을 변경해서는 안됩니다. 이는 프로그래머가
객체를 사용하는 코드의 변경없이 이 객체 내부를 변경하거나 리팩토링할
수 있도록 해줍니다. 

우리는 7장에서 어떻게 캡슐화를 제어하는지에 대해 논의했습니다: 우리는 `pub`
키워드를 사용하여 어떤 모듈들, 타입들, 함수들, 그리고 메소드들이 공개될 것인가를
결정할 수 있으며, 기본적으로는 모든 것들이 비공개입니다. 예를 들면, 우리는 `i32`
값의 벡터 항목을 가지고 있는 `AveragedCollection` 구조체를 정의할 수
있습니다. 또한 이 구조체는 벡터의 값에 대한 평균값을 담는 항목도 갖는데,
이는 누구든 평균값이 필요한 순간마다 매번 이를 계산할 필요는 없음을 의미합니다.
바꿔 말하면, `AveragedCollection`은 우리를 위해 계산된 평균값을 캐쉬할
것입니다. Listing 17-1가 이 `AveragedCollection` 구조체에 대한
정의입니다.

<span class="filename">Filename: src/lib.rs</span>

```rust
pub struct AveragedCollection {
    list: Vec<i32>,
    average: f64,
}
```

<span class="caption">Listing 17-1: 콜렉션 내의 정수
항목들과 그의 평균을 관리하는 `AveragedCollection`
구조체</span>

구조체가 `pub`으로 표기되면 다른 코드가 이를 사용할 수 있게 되지만, 구조체 안에 존재하는
항목들은 여전히 비공개입니다. 이는 이번 사례에 매우 중요한데, 그 이유는 하나의 값이
리스트에서 더해지거나 제거될 때마다 평균 또한 갱신되는 것을 확신하길 원하기 때문입니다.
우리는 `add`, `remove`, 그리고 `average` 메소드를 구조체에 구현하여 이를 달성하고자
하며, 이는 Listing 17-2과 같습니다:

<span class="filename">Filename: src/lib.rs</span>

```rust
# pub struct AveragedCollection {
#     list: Vec<i32>,
#     average: f64,
# }
impl AveragedCollection {
    pub fn add(&mut self, value: i32) {
        self.list.push(value);
        self.update_average();
    }

    pub fn remove(&mut self) -> Option<i32> {
        let result = self.list.pop();
        match result {
            Some(value) => {
                self.update_average();
                Some(value)
            },
            None => None,
        }
    }

    pub fn average(&self) -> f64 {
        self.average
    }

    fn update_average(&mut self) {
        let total: i32 = self.list.iter().sum();
        self.average = total as f64 / self.list.len() as f64;
    }
}
```

<span class="caption">Listing 17-2: `AveragedCollection`의 공개 메소드 `add`,
`remove`, 그리고 `average`</span>

공개 메소드들 `add`, `remove`, 그리고 `average`는 `AveragedCollection`의
인스턴스를 수정하는 유일한 방법입니다. 아이템이 `list`에 `add` 메소드를 통해
추가되거나 `remove` 메소드를 통해 제거될 때, 각각의 호출은 비공개
`update_average` 메소드를 호출하여 `average` 필드를 변경하도록 하는
역할 또한 수행합니다.

우리가 `list`와 `average` 필드를 비공개로 두었으므로 외부 코드가
`list` 필드에 직접 아이템들을 추가하거나 제거할 방법은 없습니다;
그렇지 않으면, `average` 필드는 `list`가 변경될 때 동기화되지 않을지도
모릅니다. `average` 메소드는 `average` 필드의 값을 반환하여,
외부 코드가 `average`를 읽을 수 있도록 하지만, 변경은 안됩니다. 

우리가 `AveragedCollection`의 내부 구현을 캡슐화했기 때문에,
차후에 데이터 구조 등을 쉽게 변경할 수 있습니다. 예를 들면,
우리는 `list` 필드에 대해서 `Vec<i32>`가 아닌 `HashSet<i32>`를
사용할 수 있습니다. `add`, `remove` 그리고 `average` 공개 메소드들의
선언이 그대로 유지되는 한, `AveragedCollection`를 사용하는 코드들은
변경될 필요가 없습니다. 대신 우리가 `list`를 공개했다면 꼭 그런 상황이
될 수는 없을 것입니다: `HashSet<i32>`와 `Vec<i32>`는 아이템들을
추가하거나 제거하기 위한 메소드들이 다르므로, 만약 `list`에 직접 접근하여
변경하는 방식의 외부 코드들이 있다면 모두 변경되어야겠죠.

만약 캡슐화가 객체 지향을 염두하는 언어를 위한 필요 요소라면,
러스트는 이를 만족합니다. 코드의 서로 다른 부분들에 대해 `pub`을
사용하거나 사용하지 않는 옵션이 구현 세부 사항의 캡슐화를 가능케 합니다. 

### 타입 시스템과 코드 공유로서의 상속

*상속*은 어떤 객체가 다른 객체의 정의를 상속받아서, 이를 통해 부모
객체의 데이터와 동작들을 다시 정의하지 않고도 얻을 수 있게 해주는
메커니즘입니다.

만약 객체 지향 언어가 반드시 상속을 제공해야 한다면, 러스트는
그렇지 않은 쪽입니다. 부모 구조체의 필드와 메소드 구현을 상속받는
구조체를 정의할 방법은 없습니다. 하지만 여러분이 상속에 익숙하다면,
우선 이를 사용하고자 하는 이유에 따라 러스트의 다른 솔루션들을
이용할 수 있습니다.

여러분은 두가지 주요한 이유에 의해 상속을 택합니다. 하나는 코드를 재사용하는
것입니다: 여러분은 어떤 타입의 특정한 행위를 구현할 수 있고, 상속은 당신이
다른 타입을 위해 그 구현을 재사용할 수 있도록 만들어줍니다. 여러분은 대신
기본 트레잇 메소드의 구현을 이용하여 러스트 코드를 공유할 수 있는데, 이는
Listing 10-14에서 우리가 `Summary` 트레잇에 `summarize` 메소드의
기본 구현을 추가할 때 봤던 것입니다. `Summary` 트레잇을 구현하는 어떤
타입이든, `summarize` 메소드를 별도로 작성하지 않더라도 사용 가능합니다.
이는 어떤 메소드의 구현체를 갖는 부모 클래스와 그를 상속받는 자식 클래스
또한 그 메소드의 해당 구현체를 갖는 것과 유사합니다. 우리는 또한 `Summary`
트레잇을 구현할 때 `summarize`의 기본 구현을 오버라이딩할 수 있고,
이는 자식 클래스가 부모 클래스에서 상속받는 메소드를 오버라이딩하는 것과
유사합니다.

상속을 사용하는 다른 이유는 타입 시스템과 관련있습니다: 자식 타입을 같은
위치에서 부모 타입처럼 사용할 수 있게 하기 위함입니다. 이를 또한
*다형성 (polymorphism)* 이라고도 부르는데, 이는 여러 객체들이 일정한 특성을
공유한다면 이들을 런타임에 서로 바꿔 대입하여 사용할 수 있음을 의미합니다.

> ### 다형성
>
> 많은 사람들아 다형성을 상속과 동일시 합니다. 하지만 다형성은 다수의
> 타입들의 데이터에 대해 동작 가능한 코드를 나타내는 더 범용적인 개념입니다.
> 상속에서는 이런 타입들이 일반적으로 하위클래스에 해당합니다.
>
> 러스트는 대신 제네릭을 사용하여 호환 가능한 타입을 추상화하고 트레잇 바운드를
> 이용하여 해당 타입들이 반드시 제공해야 하는 제약사항을 부과합니다. 이것을 종종
> *범주내 매개변수형 다형성 (bounded parametric polymophism)* 이라고 부릅니다. 

최근에는 상속이 많은 프로그래밍 언어에서 프로그래밍 디자인
솔루션으로서의 인기가 떨어지고 있는데 그 이유는 필요한 것보다 더
많은 코드를 공유할 수 있는 위험이 있기 때문입니다. 하위 클래스가
늘 그들의 부모 클래스의 모든 특성을 공유해서는 안되지만 상속한다면
그렇게 됩니다. 이는 프로그램의 유연성을 저하시킬 수 있습니다. 또한,
하위 클래스에서는 타당하지 않거나 적용될 수 없어서 에러를 유발하는
메소드들이 호출될 수 있는 가능성을 만듭니다. 게다가, 어떤 언어들은
하나의 클래스에 대한 상속만을 허용하기 때문에 프로그램 디자인의
유연성을 더욱 제한하게 됩니다.

이런 이유로, 러스트는 다른 방식을 취하여, 상속 대신에 트레잇 객체를 사용합니다.
러스트에서 어떤 식으로 트레잇 객체가 다형성을 가능케 하는지 살펴봅시다.
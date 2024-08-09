---
    title: OOP (객체 지향 프로그래밍)
    created_time: 2024-08-04T07:10:00.000Z
    ---
    
## **Why We Need OOP**


```python
kohi = {
    "name": "kohi",
    "xp": 1000,
    "team": "Team X"
}

# 사람이 300명 정도 더 있다면 300개 데이터를 전부 선언해 줄 것인가
jack = {
    "name": "jack",
    "xp": 2000,
    "team": "Team Z"
}

def introduct(player):
    name = player["name"]
    team = player["team"]
    print(f"Hello! My name is {name} and I play for {team}")

introduct(kohi)
# Hello! My name is kohi and I play for Team X

introduct(1)
```


함수 introduct는 딕셔너리 형태의 객체를 입력으로 받아야 하며, 이 딕셔너리에는 name과 team이라는 키가 있어야 한다. introduct 함수는 player 객체가 name과 team 속성을 가질 것으로 가정하고, 이 속성들에 접근한다. 그러나 introduct(1)처럼 숫자를 전달하면, 숫자는 name과 team 같은 속성을 가지고 있지 않기 때문에 오류가 발생하는 것이다.


## **Classes**


Class는 데이터가 어떻게 생겨야 하는지에 대한 청사진으로, 데이터의 구조를 정의할 수 있도록 한다.

- Puppy Class를 만들고, ruffus를 Puppy 객체로 만듦

```python
class Puppy:
    pass

ruffus = Puppy() # 소괄호를 씀
print(ruffus)
# result: <__main__.Puppy object at 0x10421da00>
```


## Method


Method는 Class의 내부 함수


Class 안에 있는 Method는 하나 이상의 argument를 갖고, 그 Method의 첫 번째 argument는 반드시 자기 자신(self)을 참조한다.


```python
class Puppy:
    def __init__(self):
        print(self)
        # result: <__main__.Puppy object at 0x102621a60>
        # ruffus의 값과 동일함
        print('Puppy is born!')

ruffus = Puppy()
```


```python
class Puppy:
    def __init__(self):
        self.name = "Ruffus"
        self.age = 2
        self.breed = "Beagle"

ruffus = Puppy()
print(ruffus.name, ruffus.age, ruffus.breed)
# result: Ruffus 2 Beagle
```


해당 프로세스를 커스텀(Class를 확장)하고자 한다면 다음과 같다.


```python
class Puppy:
    def __init__(self, name, breed):
        self.name = name
        self.age = 2
        self.breed = breed

    def __str__(self):
        return f"Hello! {self.name}"

# 위치로도 argument 전달 가능
ruffus = Puppy(name = "Ruffus", breed = "Beagle")
bibi = Puppy(name = "Bibi", breed = "Dalmathian")

print(ruffus, bibi)
# Hello! Ruffus Hello! Bibi

```


__init__ 메서드는 객체가 생성될 때 자동으로 호출되는 초기화 메서드로, 클래스의 인스턴스를 만들 때 (`ruffus = Puppy(name = "Ruffus", breed = "Beagle")`) 호출된다.


반면, woof_woof 메서드는 객체가 생성된 후 명시적으로 호출될 때(`ruffus.introduce()`) 실행되며, 특별한 매개변수를 받지 않고, 기본적으로 인스턴스(self)를 받는다.


```python
class Puppy:
    def __init__(self, name, breed):
        self.name = name
        self.age = 2
        self.breed = breed
    
    def woof_woof(self):
        print("Woof Woof!")
    
    def introduce(self):
        self.woof_woof()
        print(f"My name is {self.name} and I am baby {self.breed}")

ruffus = Puppy(name = "Ruffus", breed = "Beagle")
bibi = Puppy(name = "Bibi", breed = "Dalmathian")

ruffus.introduce()
# Woof Woof!
# My name is Ruffus and I am baby Beagle
bibi.introduce()
# Woof Woof!
# My name is Bibi and I am baby Dalmathian
```


## **Inheritance**


__init__ 메서드가 중복되는 코드


```python
class GuardDog:
    def __init__(self, name, breed):
        self.name = name
        self.age = 50
        self.breed = breed

    def rrrrr(self):
        print("stay away")

class Puppy:
    def __init__(self, name, breed):
        self.name = name
        self.age = 2
        self.breed = breed
    
    def woof_woof(self):
        print("Woof Woof!")
```


클래스 상속을 통해 두 개의 서브클래스(GuardDog와 Puppy)가 부모 클래스(Dog)의 속성과 메서드를 물려받는다. 


```python
class Dog:
    def __init__(self, name, breed, age):
        self.name = name
        self.age = age
        self.breed = breed

class GuardDog(Dog):
    def __init__(self, name, breed):
        super().__init__(name, breed, 50)
        # super는 부모(Dog)의 클래스를 참조한다.

    def rrrrr(self):
        print("stay away")

class Puppy(Dog):
    def __init__(self, name, breed):
        super().__init__(name, breed, 2)
        # super는 부모(Dog)의 클래스를 참조한다.
    
    def woof_woof(self):
        print("Woof Woof!")


ruffus = Puppy(name = "Ruffus", breed = "Beagle")
bibi = GuardDog(name = "Bibi", breed = "Dalmathian")

ruffus.woof_woof()
# Woof Woof!

bibi.rrrrr()
# stay away

```

- 부모 클래스 (Dog):
	- Dog 클래스는 모든 개의 공통 속성(name, breed, age)을 정의
	- __init__ 메서드를 통해 개체를 초기화
- 서브클래스 (GuardDog와 Puppy):
	- GuardDog와 Puppy는 Dog 클래스를 상속받아 정의된 서브클래스
	- super()를 사용하여 부모 클래스의 __init__ 메서드를 호출하고, 이를 통해 부모 클래스의 속성을 초기화

상속을 통해 코드의 재사용성을 높이고, 클래스 간의 관계를 명확히 할 수 있다.


## Refactor


```python
class Player:
    def __init__(self, name, team):
        self.name = name
        # self.xp = xp
        self.team = team

    def introduce(self):
        print(f"Hello! My name is {self.name} and I play for {self.team}")

class Team:
    def __init__(self, team_name):
        self.team_name = team_name
        self.players = []
    
    def show_player(self):
        for player in self.players:
            player.introduce()

    def add_player(self, name):
        new_player = Player(name, self.team_name)
        self.players.append(new_player)

team_x = Team("Team X")
team_z = Team("Team Z")

team_x.add_player("kohi")
team_z.add_player("jack")

team_x.show_player()
```

- **데이터 구조화**: 플레이어 정보를 저장하기 위해 Player 클래스 사용
- **확장성**: Team 클래스를 통해 팀에 플레이어를 쉽게 추가할 수 있다. 많은 플레이어를 객체로 관리할 수 있어 확장성이 높다.
- **타입 안전성**: add_player와 같은 메서드가 클래스의 인스턴스를 사용하기 때문에 타입 오류의 가능성이 줄어든다.

## **Code Challenge**

1. Team Class에 player를 삭제하는 메서드를 만든다.
2. Team Class에 팀원의 xp를 총합하고, print하는 메서드를 만든다.

```python
class Player:
    def __init__(self, name, xp, team):
        self.name = name
        self.xp = xp
        self.team = team

    def introduce(self):
        print(f"Hello! My name is {self.name} and I play for {self.team}")

class Team:
    def __init__(self, team_name):
        self.team_name = team_name
        self.players = []
    
    def show_player(self):
        for player in self.players:
            player.introduce()

    def add_player(self, name, xp=0):
        new_player = Player(name, xp, self.team_name)
        self.players.append(new_player)

    def remove_player(self, name):
        self.players = [player for player in self.players if player.name != name]

    def total_xp(self):
        total_xp = sum(player.xp for player in self.players)
        print(f"Total XP of team {self.team_name}: {total_xp}")

team_x = Team("Team X")
team_z = Team("Team Z")

team_x.add_player("kohi", 1000)
team_x.add_player("sam", 500)
team_z.add_player("jack", 1200)

team_x.show_player()
"""
Hello! My name is kohi and I play for Team X
Hello! My name is sam and I play for Team X
"""
team_x.total_xp()
# Total XP of team Team X: 1500

team_x.remove_player("sam")
team_x.show_player()
# Hello! My name is kohi and I play for Team X
```


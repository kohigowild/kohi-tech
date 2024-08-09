---
    title: 큐(Queue), 스택(Stack), 트리(Tree)
    created_time: 2024-07-07T03:37:00.000Z
    ---
    
## 자료구조


---


![%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3_%281%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/7222eb8a-d520-4854-b80b-169464819646/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=61ed8a077840c602b0bd54ce6ba0bcc02a37ae80cfd1b0dc252deab79091ccb3&X-Amz-SignedHeaders=host&x-id=GetObject)

- 여러 데이터의 묶음을 저장하고 효율적으로 사용하는 방법을 정의한 것
- 특정한 상황에 놓인 문제를 해결하는 데 특화

## 스택(Stack)과 큐(Queue)


---


![%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3_%282%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/b4f5a8e0-b4b6-4ac7-98ab-5fe52e70e6fb/%E1%84%83%E1%85%A1%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%85%E1%85%A9%E1%84%83%E1%85%B3_%282%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=585bc059a6e15831ebc742f360bf53aec534832a7d8495ff0e7ad02bcec64092&X-Amz-SignedHeaders=host&x-id=GetObject)


스택과 큐 모두 Linear한(선형) 자료 구조이다. 이 둘은 아주 유사한 구조이나, element가 제거되는 방식에 차이가 있다.

	- 스택은 마지막으로 삽입된 element가 가장 먼저 제거되는 방식인 LIFO(Last In First Out, 후입선출) 자료구조이다. 스택의 예시로는 브라우저 히스토리(이전 페이지, 다음 페이지) 또는 ctrl + z로 이전 작업을 취소하는 동작 등을 들 수 있다.
	- 큐는 FIFO(First In First Out, 선입선출) 자료구조이다. 줄 서기를 생각하면 된다. 큐의 예시로는 예매 앱, 레스토랑 예약 등을 들 수 있을 것이다.

### 큐(Queue)


![Untitled_%2811%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/4fc99732-1c06-4393-8f1e-5cb1515257b3/Untitled_%2811%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=4ee1493e847379fd844eff859b5330e0628dcfe0460e5841309b229a30ba1799&X-Amz-SignedHeaders=host&x-id=GetObject)

- 데이터를 집어 넣을 수 있는 선형 자료 구조이다.
- 먼저 집어 넣은 데이터가 먼저 나온다. 데이터를 집어 넣는 enqueue, 데이터를 추출하는 dequeue 작업을 할 수 있다.
- 순서대로 처리해야 하는 작업을 임시로 저장하는 버퍼로 많이 사용된다.
- 배열 활용 시, unshift() - pop() 메서드 혹은 push() - shift() 메서드 조합을 사용하는 것이 큐의 작동 방식과 같다. unshift() 메서드를 사용해 데이터를 추가하는 경우 전체 배열에 인덱스를 다시 부여해야 하므로 성능이 좋지는 않다.

```javascript
class Queue {
  constructor() {
    this._arr = [];
  }
  enqueue(item) {
    this._arr.push(item);
  }
  dequeue() {
    return this._arr.shift();
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.dequeue(); // 1
```


메서드를 사용하지 않고 큐를 구현하는 방식은 다음과 같다.


```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
}
```


**Enqueue 구현**

	- push() 메서드처럼 노드를 제일 뒤에 추가한다.

```javascript
enqueue(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }
```


**Dequeue  구현**

	- shift() 메서드처럼 제일 앞 노드를 제거하고 반환한다.

	```javascript
	dequeue() {
	    if (!this.first) return null;
	
	    const temp = this.first;
	    if (this.first === this.last) {
	      this.last = null;
	    }
	    this.first = this.first.next;
	    this.size--;
	    return temp.value;
	  }
	```


## 스택(Stack)


---


![Untitled_%2812%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/23b196ea-7d78-4768-8851-85c63275a493/Untitled_%2812%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=344dae33d1720be3252da6922789bce44ad0a05e25b2052d3151b8a919b137cb&X-Amz-SignedHeaders=host&x-id=GetObject)

- 데이터를 집어 넣을 수 있는 선형 자료 구조이다.
- 나중에 집어 넣은 데이터가 먼저 나온다. 데이터를 집어 넣는 push, 데이터를 추출하는 pop, 맨 나중에 집어 넣은 데이터를 확인하는 peek 등의 작업을 할 수 있다.
- 스택은 서로 관계가 있는 여러 작업들을 연달아 수행하면서 이전의 작업 내용을 저장할 필요가 있을 경우 사용된다.
- 배열을 이용해 스택 구조를 구현하면 다음과 같다.

```javascript
class Stack {
  constructor() {
    this._arr = [];
  }
  push(item) {
    this._arr.push(item);
  }
  pop() {
    return this._arr.pop();
  }
  peek() {
    return this._arr[this._arr.length - 1];
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.pop(); // 3
```


## 트리(Tree)


---


![103262263-cec19c00-49e7-11eb-8698-0699bdd822f8.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/3deac88a-930c-444c-9533-6ba2d45325fc/103262263-cec19c00-49e7-11eb-8698-0699bdd822f8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=6eb6124e2570cd1890baf8d90331734603978837ad8596db6ca7bd8231b972d6&X-Amz-SignedHeaders=host&x-id=GetObject)


트리를 다룰 때 사용되는 용어 정리

- 노드(Node) - 트리 안에 들어 있는 각 항목
- 자식 노드(Child Node) - 노드는 여러 자식 노드를 가질 수 있다.
- 부모 노드(Parent Node) - 노드 A가 노드 B를 자식으로 갖고 있다면 노드 A는 노드 B의 부모 노드
- 뿌리 노드(Root Node) - 트리의 가장 상층부에 있는 노드
- 잎 노드(Reaf Node) - 자식 노드가 없는 노드
- 조상 노드(Ancestor Node) - 노드 A의 자식을 따라 내려갔을 때 노드 B에 도달할 수 있는 경우 노드 A는 노드 B의 조상 노드
- 자손 노드(Descendant Node) - 노드 A가 노드 B의 조상 노드일 때 노드 B는 노드 A의 자손 노드
- 형제 노드(Sibling Node) - 같은 부모 노드를 가진 다른 노드
- 노드의 크기(Size) - 자신을 포함한 모든 자손 노드의 개수
- 노드의 깊이(Depth) - 루트에서 어떤 노드에 도달하기 위해 거쳐야 하는 간선의 수
- 노드의 레벨(Level) - 트리의 특정 깊이를 가지는 노드의 집합
- 노드의 차수(Degree) - 하위 트리 개수 / 간선 수 (degree) = 각 노드가 지닌 가지의 수
- 트리의 차수(Degree of Tree) - 트리의 최대 차수
- 트리의 높이(Height) - 루트 노드에서 가장 깊숙이 있는 노드의 깊이

트리는 다음과 같은 성질을 가진다.

- 트리는 하나의 뿌리 노드를 갖는다.
- 뿌리 노드는 하나 이상의 자식 노드를 갖는다.
- 그 자식 노드 또한 0개 이상의 자식 노드를 갖고 있고, 이는 반복적으로 정의된다.
- 트리는 노드와 노드를 연결하는 간선(Edge)으로 구성되어 있다.
- 노드가 N개인 트리는 항상 N-1개의 간선을 가진다.
- 트리에는 사이클이 존재할 수 없다.
- 그래프의 한 종류로, 계층적 관계를 표현하는 비선형적 자료 구조이다.
- 순회는 Pre-order, In-order 아니면 Post-order로 이루어진다. 이 3가지 모두 DFS / BFS 안에 있다.
- 트리는 이진 트리, 이진 탐색 트리, 균형 트리(AVL 트리, Red-Black 트리), 이진 힙(최대 힙, 최소 힙) 등이 있다.
- 다음은 간단하게 트리 구조를 구현한 예시이다.

```javascript
class Node {
  constructor(content, children = []) {
    this.content = content;
    this.children = children;
  }
}

const tree = new Node('hello', [
  new Node('world'),
  new Node('and'),
  new Node('fun', [

    new Node('javascript!')
  ])
]);

function traverse(node) {
  console.log(node.content);
  for (let child of node.children) {
    traverse(child);
  }
}

traverse(tree);
// hello world and fun javascript!
```


### 이진 트리


각 노드가 최대 두 개의 자식을 갖는 트리


### 이진 트리 순회


**💡 전위 순회 - 현재 노드 ⇒ 왼쪽 가지 ⇒ 오른쪽 가지**


![Untitled_%2813%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/3f627421-abf9-4b1f-ba91-315c69e96ab5/Untitled_%2813%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=7219abfd85df3b840ae41a724bb200854d080a7459cc0d403a1b7bf175f72276&X-Amz-SignedHeaders=host&x-id=GetObject)


```javascript
preorder(callback) {
    callback(this.value);
    if (this.left) {
      this.left.preorder(callback);
    }
    if (this.right) {
      this.right.preorder(callback);
    }
  }
```


**💡 중위 순회 - 왼쪽 가지 ⇒ 현재 노드 ⇒ 오른쪽 가지**


![Untitled_%2814%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/57eb31d1-1164-4ba0-a6d2-8adbff08a881/Untitled_%2814%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=49d5d5584aab350ccbb62098a8c2be9083bd01b6c9237335c90b0b38408aabdc&X-Amz-SignedHeaders=host&x-id=GetObject)


```javascript
inorder(callback) {
    if (this.left) {
      this.left.inorder(callback);
    }
    callback(this.value);
    if (this.right) {
      this.right.inorder(callback);
    }
```


**💡 후위 순회 - 왼쪽 가지 ⇒ 오른쪽 가지 ⇒ 현재 노드**


![Untitled_%2815%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/980a548c-def8-46b8-8b5d-f839131f2bd0/Untitled_%2815%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=61587a0ffe982dd92c18e99d45285456ad679fde9d8f6d8e8ff54c5d4ed260d9&X-Amz-SignedHeaders=host&x-id=GetObject)


```javascript
postorder(callback) {
    if (this.left) {
      this.left.postorder(callback);
    }
    if (this.right) 
      this.right.postorder(callback);
    }
    callback(this.value);
  }
```


### 이진 탐색 트리


**💡 이진 탐색 트리**


![Untitled_%2816%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/fc895868-851d-45fb-9dac-ab4041bd28ef/Untitled_%2816%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=4414d80e0c5c42a9de71d490d96744657954c214a8af204ef522b91d513fa2a9&X-Amz-SignedHeaders=host&x-id=GetObject)

- 노드의 왼쪽 서브트리에는 그 노드의 값보다 작은 값들을 지닌 노드들로 이루어져 있다.
- 노드의 오른쪽 서브트리에는 그 노드의 값보다 큰 값들을 지닌 노드들로 이루어져 있다.
- 좌우 하위 트리는 각각이 다시 이진 탐색 트리여야 한다.

**💡 균형 트리**

- O(logN) 시간에 insert와 find를 할 수 있을 정도로 균형이 잘 잡혀 있는 트리

**💡 이진 힙**


![Untitled_%2817%29.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/420927ef-2057-4e77-b9b7-d7005a1db0dd/803c9282-97c1-4537-90c6-530eaa6b1b3e/Untitled_%2817%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240809%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240809T002522Z&X-Amz-Expires=3600&X-Amz-Signature=297adb150ad2badc76a7fffddce1293ee2159c1dcddb89ad4566c82c2300b23f&X-Amz-SignedHeaders=host&x-id=GetObject)

- 최소 힙(Min Heap) - 부모 노드가 자식 노드보다 작거나 같다. 즉, 루트 노트가 최솟값이 된다.
- 최대 힙(Max Heap) - 부모 노드가 자식 노드보다 크거나 같다. 즉, 루트 노드가 최댓값이 된다.

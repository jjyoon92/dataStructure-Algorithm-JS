class Node{ // node class 생성
    // 클래스를 인스턴스화 했을 때 자동으로 호출되는 생성자를 만듬
    // 일반적으로 생성자에서 초기화를 한다.
    // 생성자의 매개변수로 data, next 생성
    // next 의 기본값은 null
    // 매개변수 data는 필수이지만 next는 입력하지 않는다면 null이 할당됨
    // 자바스크립트에서 클래스 내의 변수를 프로퍼티라고 한다.
    // 생성자 내에서 data와 next 프로퍼티를 만들어 매개변수 data와 next로 초기화
    constructor(data, next = null){
        this.data = data;
        this.next = next;
    }
}

class LinkedList{
    constructor(){
        this.head = null; // 연결리스트의 시작 노드를 가리키는 프로퍼티
        this.count = 0; // 총 저장된 노드의 수를 저장하는 프로퍼티
    }

    printAll(){
        let currentNode = this.head;
        let text = "[";

        while(currentNode != null){
            text += currentNode.data;
            currentNode = currentNode.next;

            if(currentNode != null){
                text += ", ";
            }
        }

        text += "]";
        console.log(text);
    }

    clear(){ // 리스트의 모든 원소를 제거하는 기능
        this.head = null; // head가 null을 가리켜 참조하는 것이 없게 함
        this.count = 0; // count를 0으로 초기화
    }

    insertAt(index, data){
        if(index > this.count || index < 0 ) {
            // 연결리스트의 크기보다 큰 곳에 삽입하거나, 음수인 경우 에러 발생
            throw new Error("범위를 넘어갔습니다.");
        }

        let newNode = new Node(data);

        // 새로운 노드가 리스트의 가장 앞에 삽입되는 경우
        if(index == 0){
            newNode.next = this.head;
            this.head = newNode;
        } else { // 앞부분을 제외한 곳에 삽입되는 경우
            // 삽입하려는 노드 바로 전까지 가기 위한 변수 head로 초기화
            let currentNode = this.head;
            // 목표 인덱스 바로 전까지 next를 이용해 currentNode를 이동
            for(let i = 0; i < index - 1; i++){
                currentNode = currentNode.next;
            }
            newNode.next = currentNode.next;
            currentNode.next = newNode;
        }

        this.count++;
    }
    insertLast(data){
        this.insertAt(this.count, data);
    }

    deleteAt(index){
        if(index >= this.count || index < 0){
            throw new Error("제거할 수 없습니다.");
        }

        let currentNode = this.head;

        if(index == 0){
            let deletedNode = this.head;
            this.head = this.head.next;
            this.count--;
            return deletedNode;
        } else {
            for(let i = 0; i < index - 1; i++){
                currentNode = currentNode.next;
            }

            let deletedNode = currentNode.next;
            currentNode.next = currentNode.next.next;
            this.count--;
            return deletedNode;
        }
    }

    deleteLast(){
        return this.deleteAt(this.count - 1);
    }

    getNodeAt(index){
        if(index >= this.count || index < 0){
            throw new Error("범위를 넘어갔습니다.");
        }

        let currentNode = this.head;
        for(let i = 0; i < index; i++) {
            currentNode = currentNode.next;
        }

        return currentNode;
    }
}
// 다른 자바스크립트 파일에서 Node 클래스를 참조할 수 있도록 export
export { Node, LinkedList };
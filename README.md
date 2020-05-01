## react-vitual-keyboard

[react-vitual-keyboard](https://github.com/qzruncode/react-vitual-keyboard)

### Install
```
npm install react-vitual-keyboard --save
```

### Example

![demo](./image/example.png)

### Usage
```
import React from 'react';
import CodeInput from 'react-vitual-keyboard';

interface IProps {
}
interface IState {
    show: boolean;
}
class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            show: true,
        };
    }

    public handleClose(show: boolean) {
        this.setState({
            show,
        });
    }

    public handleInput(numbers: number[]) {
        console.log('The user is typing', numbers);
    }

    public handleFinish(numbers: number[]) {
        console.log('I've typed it in', numbers);
    }

    public handleSendCode() {
        console.log('User click please send verification code');
    }

    public render() {
        return (
            <div>
                <CodeInput
                    num={4}                             // required (Number of number boxes)[number]
                    show={this.state.show}              // required (Close and hide)[boolean]
                    onClose={this.handleClose}          // optional (Closed callback)[function]
                    onInput={this.handleInput}          // optional (The callback being entered)[function]
                    onFinish={this.handleFinish}        // optional (Enter the completed callback)[function]
                    onSendCode={this.handleSendCode}    // optional (Send verification code)[function]
                />
            </div>
        );
    }
}
export default App;
```

### Local run modification
> You can download the source code and modify it yourself from github [react-vitual-keyboard](https://github.com/qzruncode/react-vitual-keyboard)

```
npm install
npm run serve
npm run build
```
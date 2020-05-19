<img width="200" src="http://qzruncode.github.io/image/example.png" alt="keyboard" >

[![NPM version](https://img.shields.io/npm/v/react-vitual-keyboard.svg)](https://www.npmjs.com/package/react-vitual-keyboard)
[![NPM package](https://img.shields.io/npm/dy/react-vitual-keyboard.svg)](https://www.npmjs.com/package/react-vitual-keyboard)

## react-vitual-keyboard

For mobile captcha virtual keyboard, using HTML5 instead of native development

### Install
```
npm install react-vitual-keyboard --save
```

### Usage
```
import React from 'react';
import CodeInput from 'react-vitual-keyboard';
import styles from './index.scss';

interface IProps {
}
interface IState {
    show: boolean;
}
const rightCode = [8, 8, 8, 8];
class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { show: false };
    }

    public handleInput(numbers: number[]) {
        console.log('The user is typing', numbers);
    }

    public handleFinish(numbers: number[]) {
        console.log('User input completed', numbers);
    }

    public handleSendCode() {
        console.log('User click please send verification code');
        return false; // If the captcha is successfully obtained return true
    }

    public render() {
        return (
            <div>
                <div className={styles.btn} onClick={() => this.setState({show: true})}>open</div>
                <CodeInput
                    num={4}                             // required (Number of number boxes)[number]
                    mobile='13767676767'
                    show={this.state.show}              // required (Close and hide)[boolean]
                    onClose={                           // required (Closed callback)[function]
                        (show: boolean) => this.setState({show})
                    }
                    onInput={this.handleInput}          // optional (The callback being entered)[function]
                    onFinish={this.handleFinish}        // optional (Enter the completed callback)[function]
                    onSendCode={this.handleSendCode}    // optional (Send verification code)[function]
                    onValidation = () => Promise.resolve('ok') // The captcha is entered correctly
                />
            </div>
        );
    }
}
export default App;
```

### Development
> You can download the source code and modify it yourself from github [react-vitual-keyboard](https://github.com/qzruncode/react-vitual-keyboard)

```
npm install
npm run serve
npm run build
```
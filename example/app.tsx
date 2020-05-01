import React from 'react';
import CodeInput from '../src/index';

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
        console.log('用户正在输入', numbers);
    }

    public handleFinish(numbers: number[]) {
        console.log('输入框已经输入完', numbers);
    }

    public handleSendCode() {
        console.log('用户点击了请发送验证码');
    }

    public render() {
        return (
            <div>
                <CodeInput
                    num={4}
                    show={this.state.show}
                    onClose={this.handleClose}
                    onInput={this.handleInput}
                    onFinish={this.handleFinish}
                    onSendCode={this.handleSendCode}
                />
            </div>
        );
    }
}
export default App;

import React from 'react';
import CodeInput from '../src/index';
import styles from './index.scss';

interface IProps {
}
interface IState {
    show: boolean;
}
class App extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { show: false };
    }

    public handleInput(numbers: number[]) {
        console.log('The user is typing', numbers);
    }

    public handleFinish(numbers: number[]) {
        console.log('The user is typing', numbers);
    }

    public handleSendCode() {
        console.log('User click please send verification code');
    }

    public render() {
        return (
            <div>
                <div className={styles.btn} onClick={() => this.setState({show: true})}>open</div>
                <CodeInput
                    num={4}                             // required (Number of number boxes)[number]
                    show={this.state.show}              // required (Close and hide)[boolean]
                    onClose={(show: boolean) => this.setState({show})} // optional (Closed callback)[function]
                    onInput={this.handleInput}          // optional (The callback being entered)[function]
                    onFinish={this.handleFinish}        // optional (Enter the completed callback)[function]
                    onSendCode={this.handleSendCode}    // optional (Send verification code)[function]
                />
            </div>
        );
    }
}
export default App;

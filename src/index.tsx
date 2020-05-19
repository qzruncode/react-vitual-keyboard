import * as React from 'react';
import styles from './index.scss';
import { useRef, useCallback, useState, useEffect } from 'react';
import backIcon from '../static/back.svg';
import closeIcon from '../static/close.svg';

interface IProps {
    show: boolean;
    num: number;
    mobile: string;
    rightCode: number[];
    onClose?: (flag: boolean) => void;
    onInput?: (numbers: number[]) => void;
    onFinish?: (numbers: number[]) => void;
    onSendCode?: () => boolean;
    onRightInput: () => void;
}
interface IState {
}

function handleTimes(timeBox: HTMLElement, textBox: HTMLElement, getBtn: HTMLElement) {
    let totalTime = 60;
    const id = setInterval(() => {
        if (totalTime <= 0) {
            clearInterval(id);
            textBox.style.display = 'none';
            getBtn.style.display = 'block';
        } else {
            totalTime--;
        }
        timeBox.textContent = totalTime + '';
    }, 1000);
}


let numbers: any = [];
function KeyBoard(props: IProps) {
    const { onClose = () => {}, onInput = () => {}, onFinish = () => {}, onSendCode = () => false, onRightInput = () => {} } = props;

    const timeBoxR = useRef(null) as any;
    const textBoxR = useRef(null) as any;
    const getBtnR = useRef(null) as any;
    const codesParentR = useRef(null) as any;

    useEffect(() => {
        numbers = [];
    }, []);

    const [codeNumbers] = useState(() => {
        if (props.num <= 4) {
            return 4;
        } else if (props.num >= 8) {
            return 8;
        } else {
            return props.num;
        }
    });

    const [preClose, setPreClose] = useState(() => props.show);

    const [inputErr, setIputErr] = useState(false);

    const handleClick = useCallback(() => {
        if (timeBoxR && textBoxR && getBtnR) {
            if (onSendCode()) {
                textBoxR.current.style.display = 'block';
                getBtnR.current.style.display = 'none';
                handleTimes(timeBoxR.current, textBoxR.current, getBtnR.current);
            }
        }
    }, [timeBoxR, textBoxR, getBtnR]);

    const handleClose = useCallback(() => {
        setPreClose(false);
        setTimeout(() => {
            onClose(false);
        }, 300);
    }, []);

    const handleInput = useCallback((number: number) => {
        let index = numbers.length;

        if ((numbers.length >= (codeNumbers - 1)) && number < 0) {
            // 当用户输全部字符后回退
            index = codeNumbers - 1;
        }

        const currentBox = codesParentR.current.children[index];

        if (currentBox) {
            if (number < 0) {
                if (numbers.length == codeNumbers) {
                    currentBox.innerHTML = '<div class="ani"></div>';
                    currentBox.className = 'box active';
                } else if (numbers.length == (codeNumbers - 1) || currentBox.previousElementSibling) {
                    currentBox.innerHTML = '';
                    currentBox.className = 'box';
                    currentBox.previousElementSibling.innerHTML = '<div class="ani"></div>';
                    currentBox.previousElementSibling.className = 'box active';
                }
                numbers.pop();

            } else {
                numbers.push(number);
                currentBox.innerHTML = number + '';
                currentBox.className = 'box';
                if (currentBox.nextElementSibling) {
                    currentBox.nextElementSibling.innerHTML = '<div class="ani"></div>';
                    currentBox.nextElementSibling.className = 'box active';
                }
            }
        } else {
        }

        setIputErr(false);

        if (numbers.length == props.num) {
            onFinish(numbers);
            if (props.rightCode.every((item, index) => item == numbers[index])) {
                handleClose();
                onRightInput();
            } else {
                setIputErr(true);
            }
        }

        onInput(numbers);

    }, [codesParentR]);

    return (
        <div className={styles.code_input}>
            <div className={`${styles.keyboard} ${preClose ? styles.in : styles.out}`}>
                <div className={styles.kb_title}>
                    <img onClick={handleClose} src={closeIcon} alt=''/>
                    <p>请输入验证码</p>
                    <span> </span>
                </div>

                <div className={styles.code_box}>
                    {
                        inputErr ? (
                            <p className={styles.err_info}>
                                验证码不正确，请重新输入
                            </p>
                        ) : (
                            <p className={styles.code_info}>
                                短信验证码已发送至{props.mobile.slice(0, 3) + '*'.repeat(4) + props.mobile.slice(-4)}
                            </p>
                        )
                    }

                    <div className={styles.numbers}>
                        <ul className={styles.boxes} ref={codesParentR}>
                            <li className={'box active'}>
                                <div className={'ani'}></div>
                            </li>
                            {
                                (() => {
                                    let arr = [];
                                    for (let i = 0; i < codeNumbers - 1; i++) {
                                        arr.push(<li key={i} className={'box'}></li>);
                                    }
                                    return arr;
                                })()
                            }

                        </ul>
                    </div>

                    <div className={styles.get_code}>
                        <span ref={getBtnR} className={styles.btn} onClick={handleClick}>获取验证码</span>
                        <p ref={textBoxR} >重新获取验证码(<span ref={timeBoxR}>60</span>s)</p>
                    </div>
                </div>

                <div className={styles.board_box}>
                    <div className={styles.key} onClick={() => handleInput(1)}>1</div>
                    <div className={styles.key} onClick={() => handleInput(2)}>2</div>
                    <div className={styles.key} onClick={() => handleInput(3)}>3</div>
                    <div className={styles.key} onClick={() => handleInput(4)}>4</div>
                    <div className={styles.key} onClick={() => handleInput(5)}>5</div>
                    <div className={styles.key} onClick={() => handleInput(6)}>6</div>
                    <div className={styles.key} onClick={() => handleInput(7)}>7</div>
                    <div className={styles.key} onClick={() => handleInput(8)}>8</div>
                    <div className={styles.key} onClick={() => handleInput(9)}>9</div>
                    <div className={styles.key + ' ' + styles.none}> </div>
                    <div className={styles.key} onClick={() => handleInput(0)}>0</div>
                    <div className={styles.key} onClick={() => handleInput(-1)}>
                        <img src={backIcon} alt=''/>
                    </div>
                </div>
            </div>
        </div>
    );
}

class CodeInput extends React.Component<IProps, IState> {
    public render() {
        return (
            <>
                { this.props.show ? <KeyBoard {...this.props} /> : null}
            </>
        );
    }
}
export default CodeInput;

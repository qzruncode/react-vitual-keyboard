import * as React from 'react';

export interface CodeInputProps {
    show: boolean;
    num: number;
    onClose?: (flag: boolean) => void;
    onInput?: (numbers: number[]) => void;
    onFinish?: (numbers: number[]) => void;
    onSendCode?: () => void;
}
export default class CodeInput extends React.Component<CodeInputProps, any> {
    static defaultProps: {
        show: boolean;
        num: number;
    };
    render(): JSX.Element;
}
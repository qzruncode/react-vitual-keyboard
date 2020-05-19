import * as React from 'react';

export interface CodeInputProps {
    show: boolean;
    num: number;
    mobile: string;
    onClose?: (flag: boolean) => void;
    onInput?: (numbers: number[]) => void;
    onFinish?: (numbers: number[]) => void;
    onSendCode?: () => boolean;
    onValidation: () => Promise<string>;
}
export default class CodeInput extends React.Component<CodeInputProps, any> {
    static defaultProps: {
        show: boolean;
        num: number;
        rightCode: number[];
        onClose?: (flag: boolean) => void;
    };
    render(): JSX.Element;
}

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import * as React from 'react';
import {ReceiptsList} from '../../models';
import './receipt.css'

interface Props {
    data: ReceiptsList
    onRemove: any,
    keyIndex: number,
    addExpense: any,
    changeReceipt: any,
    changeReceiptType: any,
    removeExpenses: any
}

const Item = (props: any) => {
    function send(e: any) {
        const item = e.currentTarget;
        props.callback({name: item.name, value: item.value, index: props.number, keyIndex: props.keyIndex});
    }

    function clear(e: any) {
        if (+e.currentTarget.value === 0) {
            e.currentTarget.value = ''
        }
    }

    function remove() {

        props.removeExpenses({index: props.number, keyIndex: props.keyIndex})

    }

    return (
        <div className={'item'} onDoubleClick={remove}>
            <input type="text" value={props.name} name={'name'} onChange={send}/>
            <div className={'price'}>
                <input type="number" min="0" step="1" value={props.price} name={'price'} onChange={send}
                       onClick={clear}/>
                <span>$</span>
            </div>
        </div>
    )
};

class PReceipt extends React.Component<Props> {
    public remove = () => {
        const {onRemove, keyIndex} = this.props;
        onRemove(keyIndex);
    };
    public addExpenses = () => {
        this.props.addExpense(this.props.keyIndex);
    };

    public changeType = (e: any) => {
        this.props.changeReceiptType(e.target.value, this.props.keyIndex);
    };

    public render() {
        const {data} = this.props;
        const totalPrice = data.expenses.length ? data.expenses.reduce((a, b) => a + +b.price, 0) : 0;
        const items = data.expenses.length ? data.expenses.map((item, index) => {
            return (
                <Item key={index} name={item.name} keyIndex={this.props.keyIndex} price={item.price}
                      removeExpenses={this.props.removeExpenses} callback={this.props.changeReceipt} number={index}/>
            )
        }) : null;
        return (
            <div className={'receipt-general'}>
                <div className={'receipt-options'}>
                    <Select className={'receipt-select'}
                            value={this.props.data.type}
                            onChange={this.changeType}
                    >
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Enterteinment">Enterteinment</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={this.addExpenses} color="primary">Add expense</Button>
                </div>
                <div>
                    {items}
                </div>
                <div className={'receipt-options'}>
                    <span>Total:</span>
                    <span>{totalPrice}$</span>
                </div>
                <Button onClick={this.remove} variant="contained" color="primary">Remove</Button>
            </div>
        )
    }

}

export default PReceipt;
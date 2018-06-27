import Button from '@material-ui/core/Button';
import * as React from 'react';
import {MainReceipt} from '../../models';
import PReceipt from '../receipt/Receipt';
import './tracker.css'

interface State {
    data: MainReceipt,
}

class Tracker extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            data: {
                mainTotalPrice: 0,
                receipts: []
            }
        }
    }

    public addReceipt = () => {
        const {data} = this.state;
        data.receipts.push({
            totalPrice: 0,
            expenses: [],
            type: 'Food'
        });
        this.setState({
            data
        })
    };

    public addExpense = (keyIndex: number) => {
        const {data} = this.state;
        data.receipts[keyIndex].expenses.push({
            name: '',
            price: 0
        });
        this.setState({
            data
        });


    };

    public removeReceipt = (keyIndex: number) => {
        const {data} = this.state;
        data.receipts.splice(keyIndex, 1);
        this.calculateMainTotalPrice(keyIndex);
        this.setState({
            data
        });
    };
    public changeReceipt = (props: any) => {
        this.calculateMainTotalPrice(props.keyIndex, props.index, { name: props.name, value: props.value });
    };

    public calculateMainTotalPrice =  (keyIndex: number, index: any = null,item:any = null) => {
        const {data} = this.state;
        if (item) {
            data.receipts[keyIndex].expenses[index][item.name] = item.value;
        }
        if (index !== null) {
             data.receipts[keyIndex].totalPrice = data.receipts[keyIndex].expenses.reduce((a, b) => a + +b.price, 0);
        }
        data.mainTotalPrice = data.receipts.reduce((a, b) => a + b.totalPrice, 0);
         this.setState({
            data
        });

    };

    public changeReceiptType = (value: string, keyIndex: number) => {
        const {data} = this.state;
        data.receipts[keyIndex].type = value;
        this.setState({
            data
        });

    };

    public removeExpenses = (props: any) => {
        const {data} = this.state;
        data.receipts[props.keyIndex].expenses.splice(props.index, 1);
        this.calculateMainTotalPrice(props.keyIndex, props.index);
        this.setState({
            data
        });


    };

    public render() {
        const {data} = this.state;
        const receipt = data.receipts.map((item, index) => {
            return (
                <PReceipt onRemove={this.removeReceipt}
                          removeExpenses={this.removeExpenses}
                          addExpense={this.addExpense}
                          changeReceiptType={this.changeReceiptType}
                          changeReceipt={this.changeReceipt}
                          key={index}
                          keyIndex={index}
                          data={item}
                />
            )
        });
        return (
            <div className={'tracker-general'}>
                <div className={'tracker-form'}>
                    {receipt}
                </div>
                <div className={'tracker-bottom'}>
                    <div>Total:</div>
                    <span>{this.state.data.mainTotalPrice}$</span>
                    <div><Button onClick={this.addReceipt} variant="contained" color="primary">Add receipt</Button>
                    </div>
                </div>
            </div>
        )
    }

}

export default Tracker;
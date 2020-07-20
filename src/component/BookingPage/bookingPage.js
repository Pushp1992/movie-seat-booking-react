import React, { Component } from "react";
import SeatPicker from "react-seat-picker";
import MockResponse from '../../utils/mockResponse';
import MockData from '../../utils/mockData';
import CustomToastr from '../../utils/toastr';

import './bookingPage.css';

class BookingPage extends Component {
    state = {
        loading: false,
        quantity: "",
        normalClassList: [],
        goldClassList: []
    }

    handleChange = (e) => {
        e.preventDefault();

        const { name, value } = e.currentTarget;
        this.setState({ [name]: value })
    }

    componentWillMount() {
        this.getResponseData();
        this.getMockData();
    }

    getMockData = () => {
        this.setState({ goldClassList: MockData })
    }

    getResponseData = async () => {
        let response = MockResponse.getMovieData();
        await response.then(res => {

            let key = Object.values(res);
            let list = [];

            key.forEach(data => {
                let subList = [];
                data.seats.forEach(el => {
                    let obj = {};

                    obj.id = el.id;
                    obj.number = el.id;
                    obj.price = el.price;
                    obj.status = el.status;
                    obj.tooltip = el.status;
                    obj.isReserved = el.status === 'seat_not_available' ? true : false;
                    // obj.isSelected = el.status === 'seat_booked' ? true: false;
                    obj.isEnabled = el.status === 'seat_not_booked' ? true : false;

                    subList.push(obj)
                    if (subList.length === 7) subList.push(null)
                })
                list.push(subList);
            })
            this.setState({ normalClassList: list }, () => console.log(this.state.normalClassList));
        })
    }

    addSeat = (row, number, id) => {
        if (this.state.quantity === "") {
            CustomToastr.warning("Please select seat quantity");
            return;
        }

        this.addSeatCallback(row, number, id)
    }

    addSeatCallback = async ({ row, number, id }, addCb) => {
        for (let i = 1; i <= this.state.quantity; i++) {
            number++;
            id++;

            await new Promise(resolve => setTimeout(resolve, 1))
            CustomToastr.success(`Added seat ${number}, row ${row}, id ${id}`)
            const newTooltip = `tooltip for id-${id} added by callback`
            addCb(row, number, id, newTooltip);

        }
    }

    addSeatCallbackContinousCase = async ({ row, number, id }, addCb, params, removeCb) => {
        if (removeCb) {
            await new Promise(resolve => setTimeout(resolve, 1))
            console.log(`Removed seat ${params.number}, row ${params.row}, id ${params.id}`)
            removeCb(params.row, params.number)
        }
        await new Promise(resolve => setTimeout(resolve, 1))
        console.log(`Added seat ${number}, row ${row}, id ${id}`)
        const newTooltip = `tooltip for id-${id} added by callback`
        addCb(row, number, id, newTooltip)
        addCb(row, 6, 6, newTooltip)
        this.setState({ loading: false })
    }

    removeSeatCallback = async ({ row, number, id }, removeCb) => {
        for (let i = 1; i <= this.state.quantity; i++) {
            number--;
            id--;
            await new Promise(resolve => setTimeout(resolve, 1))
            console.log(`Removed seat ${number}, row ${row}, id ${id}`)
            const newTooltip = ['A', 'B', 'C'].includes(row) ? null : ''
            removeCb(row, number, newTooltip)
            this.setState({ loading: false })
        }
    }

    render() {
        const normalRows = this.state.normalClassList;
        const goldRows = this.state.goldClassList;
        const { loading } = this.state;
        // let selectableSeat = Array(7);        
        let selectableSeat = [1, 2, 3, 4, 5, 6, 7];
        return (
            <div>
                <h3>Movie Seat Reservation</h3>
                <div>
                    <select name="quantity" value={this.state.quantity} placeholder="select quantity" onChange={(e) => this.handleChange(e)}>
                        <option key="select" value="select">Select seat</option>
                        {
                            selectableSeat.map((item, index) => {
                                return (
                                    <option key={index} value={item}>{item}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div style={{ marginTop: '100px' }}>
                    <h4>Gold Class</h4>
                    {
                        goldRows.length !== 0 ?
                            <SeatPicker
                                addSeatCallback={this.addSeat}
                                removeSeatCallback={this.removeSeatCallback}
                                rows={goldRows}
                                maxReservableSeats={this.state.quantity !== "" ? parseInt(this.state.quantity) : 1}
                                alpha
                                visible
                                selectedByDefault
                                loading={loading}
                                tooltipProps={{ multiline: true }}
                                continuous
                            />
                            : "No data to display"
                    }
                </div>
                <div style={{ marginTop: '100px' }}>
                    <h4>Normal Class</h4>
                    {
                        normalRows.length !== 0 ?
                            <SeatPicker
                                addSeatCallback={this.addSeat}
                                removeSeatCallback={this.removeSeatCallback}
                                rows={normalRows}
                                maxReservableSeats={this.state.quantity !== "" ? parseInt(this.state.quantity) : 1}
                                alpha
                                visible
                                selectedByDefault
                                loading={loading}
                                tooltipProps={{ multiline: true }}
                                continuous
                            />
                            : "No data to display"
                    }
                </div>
            </div>
        )
    }
}


export default BookingPage;
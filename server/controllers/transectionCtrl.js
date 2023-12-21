const { request } = require('express')
const transectionModel = require('../models/transectionModel')
const moment = require('moment')


const addTransection = async (req, res) => {
    try {
        const newTransection = new transectionModel(req.body)
        await newTransection.save()
        res.status(201).send({
            message: 'Transection created successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
}

const getallTransection = async (req, res) => {
    try {
        const { frequency, selectedDate, type } = req.body;
        const transection = await transectionModel.find({
            ...(frequency !== 'custom' ? {
                date: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate(),
                },

            } : {
                date: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }
            }),
            userid: req.body.userid,
            ...(type !== 'all' && { type })
        })
        res.status(200).send({
            message: 'Transection Fetched successfully',
            transection
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
}

const editTransection = async (req, res) => {
    try {
        await transectionModel.findOneAndUpdate({ _id: req.body.transectionId }, req.body.payload)
        res.status(200).send(
            'Edit Successfully'
        )
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error
        })
    }
}

const deleteTransection = async (req, res) => {
    try {
        await transectionModel.findOneAndDelete({ _id: req.body.transectionId })
        res.status(200).send('Transection deleted successfully')
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}


module.exports = { getallTransection, addTransection, editTransection, deleteTransection }


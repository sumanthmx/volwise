"use client";
import React, {useState} from 'react';
import { Table } from "@nextui-org/react";
import useSWR from 'swr';
import styles from './table.module.css';
import Modal from '../../components/modal/modal';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function() {

  const { data, error, isLoading } = useSWR('/report/equity_vol_data', fetcher);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState(0);
  const [instr, setInst] = useState('');
  const [expDate, setExpiry] = useState('');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const setScreenVals = (value, inst, expiry) => {
      setModalValue(value);
      setInst(inst);
      setExpiry(expiry);
  };


  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  const handleCellClick = (value, colId, inst, expiry) => {
      if (colId >= 1) {
          setModalOpen(true);
          setScreenVals(value, inst, expiry);
      }
  };

  const columns = Object.keys(data[0]);
  return (
  <div>
    <Table
      aria-label="Example table with static content"
      css={{
        height: "auto",
        minWidth: "100%",
        overflow: "auto"
      }}
    >
      <Table.Header className = {styles.colname}>
        {columns.map((column, index) => (<Table.Column key={index.toString()}> {column} </Table.Column>)) }
      </Table.Header>
      <Table.Body>
        {
          data.map((row, index) => (
            <Table.Row key={index.toString()}>
              {Object.values(row).map((value, columnIndex) => (<Table.Cell
                  key={columnIndex.toString()}
              ><button className = {styles.button}
                       onClick={() => handleCellClick(value, columnIndex,
                           Object.values(row)[0],
                           Object.keys(row)[columnIndex])}>{value}</button>
              </Table.Cell>))}
            </Table.Row>
          ))
        }
      </Table.Body>
    </Table>
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <h1>Singular Volatility Screen</h1>
        <p>Inst: {instr}</p>
        <p>Time until Expiry: {expDate}</p>
        <p>Volatility: {modalValue}</p>
    </Modal>
  </div>
  );
};
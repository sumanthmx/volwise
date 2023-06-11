"use client";
import React, {useState} from 'react';
import { Table } from "@nextui-org/react";
import useSWR from 'swr';
import styles from './table.module.css';
import Modal from '../../components/modal/modal';
import Graph from '../../components/graph';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function() {

  const { data, error, isLoading } = useSWR('/report/temp_connection', fetcher);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState(0);
  const [instr, setInst] = useState('');
  const [expDate, setExpiry] = useState('');
  const { data: gData, error: gError, isLoading: gLoading, mutate: mutateGraphData } = useSWR(`/report/vol_graph/${instr}/${expDate}`, fetcher);

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
          setScreenVals(value, inst, expiry);
          mutateGraphData().then(() => {
            setModalOpen(true);
          });
      }
  };

  const columns = ['inst', '1w', '2w', '1m', '2m', '3m', '6m', '9m', '12m', '1m1m', '1m2m',
      '2m1m', '2m2m', '3m3m', '6m3m', '6m6m', '9m3m', '1w rlzd', '2w rlzd', '1m rlzd', '1w spd', '2w spd', '1m spd'];
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
                           Object.values(row)[0], columns[columnIndex])}>{value}</button>
                  </Table.Cell>))}
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h1>Singular Volatility Screen</h1>
            <p>Option: {instr}-{expDate}</p>
            <p>Volatility: {modalValue}</p>
            {gError && <div>failed to load</div>}
            {gLoading && <div>loading...</div>}
            {gData && <Graph data={gData} />}
        </Modal>
      </div>
  );
};
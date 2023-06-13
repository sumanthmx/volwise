"use client";
import React, {useState, useEffect} from 'react';
import { Table } from "@nextui-org/react";
import useSWR from 'swr';
import styles from './table.module.css';
import Modal from '../../components/modal/modal';
import Graph from '../../components/graph';
import Dropdown from '../../components/dropdown';
import {interpolateColor} from '../../components/coloring';


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function() {

  const { data, error, isLoading } = useSWR('/report/temp_connection', fetcher);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState(0);
  const [instr, setInst] = useState('');
  const [expDate, setExpiry] = useState('');
  const [perc, setPerc] = useState(0);
  const [viewVol, setVols] = useState(true);
  const [lookback, setLookback] = useState('none');

  const { data: gData, error: gError, isLoading: gLoading, mutate: mutateGraphData } = useSWR(`/report/vol_graph/${instr}/${expDate}`, fetcher);
  const { data: sData, error: sError, isLoading: sLoading, mutate: mutateShadeData} = useSWR(`/report/vol_perc/${lookback}`, fetcher);
  const closeModal = () => {
    setModalOpen(false);
  };

  const setScreenVals = (value, inst, expiry) => {
      setModalValue(value);
      setInst(inst);
      setExpiry(expiry);
      setPerc(sData[inst + '-' + expiry]);
  };

  if (error || sError) return <div>failed to load</div>
  if (isLoading || sLoading) return <div>loading...</div>

  const handleCellClick = (value, colId, inst, expiry) => {
      if (colId >= 1) {
          setScreenVals(value, inst, expiry);
          mutateGraphData().then(() => {
            setModalOpen(true);
          });
      }
  };

  // Function passed into dropdown
  const handleOptionSelect = (option) => {
    setLookback(option);
    console.log(option);
    mutateShadeData();
  };

  // implement lookbacks later
  const columns = ['inst', '1w', '2w', '1m', '2m', '3m', '6m', '9m', '12m', '1m1m', '1m2m',
      '2m1m', '2m2m', '3m3m', '6m3m', '6m6m', '9m3m', '1w rlzd', '2w rlzd', '1m rlzd', '1w spd', '2w spd', '1m spd'];
  // Define color scale
  const colorLow = '#F0FFF0'; // Green for low percentiles
  const colorHigh = '#FFEBEB'; // Red for high percentiles
  return (
      <div>
        <button className={styles.viewbutton} onClick={() => setVols(!viewVol)}>{viewVol && 'View Percentiles'}{!viewVol && 'View Vols'}</button>
        <Dropdown onOptionSelect={handleOptionSelect} lookBack={lookback}/>
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
                      css = {{
                          backgroundColor: interpolateColor(columnIndex, colorLow,
                              colorHigh, sData[Object.values(row)[0] + "-" +
                                  columns[columnIndex]])
                      }} key={columnIndex.toString()}
                  ><button className = {styles.button}
                           onClick={() => handleCellClick(value, columnIndex,
                           Object.values(row)[0], columns[columnIndex])}>{viewVol && value}{
                               !viewVol && sData[Object.values(row)[0] + "-" +
                                  columns[columnIndex]]}</button>
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
            <p>Percentile: {perc}</p>
            {gError && <div>failed to load</div>}
            {gLoading && <div>loading...</div>}
            {gData && <Graph data={gData} />}
        </Modal>
      </div>
  );
};
/*
"use client";
import React, { useState, useEffect } from 'react';
import { Table } from "@nextui-org/react";
import useSWR from 'swr';
import styles from './archived.module.css';
import Modal from '../../components/modal/modal';
import Graph from '../../components/graph';
import { interpolateColor } from '../../components/coloring';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function MyTable() {
  const { data, error, isLoading } = useSWR('/report/temp_connection', fetcher);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalValue, setModalValue] = useState(0);
  const [instr, setInst] = useState('');
  const [expDate, setExpiry] = useState('');
  const { data: gData, error: gError, isLoading: gLoading, mutate: mutateGraphData } = useSWR(`/report/vol_graph/${instr}/${expDate}`, fetcher);

  const [shadeInst, setShadeInst] = useState('');
  const [shadeExpDate, setShadeExpiry] = useState('');
  const [shadeVal, setShadeValue] = useState(0);
  const [percentages, setPercentages] = useState([]);
  const { data: sData, error: sError, isLoading: sLoading, mutate: mutateShadeData } = useSWR(`/report/vol_shade/${shadeInst}/${shadeExpDate}/${shadeVal}`, fetcher);

  const closeModal = () => {
    setModalOpen(false);
  };

  const setScreenVals = (value, inst, expiry) => {
    setModalValue(value);
    setInst(inst);
    setExpiry(expiry);
  };

  const setShadeVals = (value, inst, expiry) => {
    setShadeValue(value);
    setShadeInst(inst);
    setShadeExpiry(expiry);
  };

  useEffect(() => {
    if (sData) {
      setPercentages(sData);
    }
  }, [sData]);

  useEffect(() => {
    const calculatePercentiles = async () => {
      const percentiles = await Promise.all(
        data.map((row) =>
          Promise.all(
            Object.values(row).map((value, columnIndex) =>
              percentile(value, columnIndex, Object.values(row)[0], columns[columnIndex])
            )
          )
        )
      );
      setPercentages(percentiles);
    };

    if (data) {
      calculatePercentiles();
    }
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const handleCellClick = (value, colId, inst, expiry) => {
    if (colId >= 1) {
      setScreenVals(value, inst, expiry);
      mutateGraphData().then(() => {
        setModalOpen(true);
      });
    }
  };

  const percentile = async (value, colId, inst, expiry) => {
    if (colId === 0) return 0;
    setShadeVals(value, inst, expiry);
    await mutateShadeData();
    return sData[0];
  };

  const columns = [
    'inst',
    '1w',
    '2w',
    '1m',
    '2m',
    '3m',
    '6m',
    '9m',
    '12m',
    '1m1m',
    '1m2m',
    '2m1m',
    '2m2m',
    '3m3m',
    '6m3m',
    '6m6m',
    '9m3m',
    '1w rlzd',
    '2w rlzd',
    '1m rlzd',
    '1w spd',
    '2w spd',
    '1m spd',
  ];

  // Define color scale
  const colorLow = '#00ff00'; // Green for low percentiles
  const colorHigh = '#ff0000'; // Red for high percentiles

  return (
    <div>
      <Table
        aria-label="Example archived with static content"
        css={{
          height: 'auto',
          minWidth: '100%',
          overflow: 'auto',
        }}
      >
        <Table.Header className={styles.colname}>
          {columns.map((column, index) => (
            <Table.Column key={index.toString()}> {column} </Table.Column>
          ))}
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => (
            <Table.Row key={index.toString()}>
              {Object.values(row).map((value, columnIndex) => (
                <Table.Cell
                  css={{
                    backgroundColor: interpolateColor(
                      columnIndex,
                      colorLow,
                      colorHigh,
                      percentages.length > 0 ? percentages[index][columnIndex] : 0
                    ),
                  }}
                  key={columnIndex.toString()}
                >
                  <button
                    className={styles.button}
                    onClick={() =>
                      handleCellClick(
                        value,
                        columnIndex,
                        Object.values(row)[0],
                        columns[columnIndex]
                      )
                    }
                  >
                    {value}
                  </button>
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
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
}

 */
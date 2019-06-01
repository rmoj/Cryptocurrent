import React, { Component } from 'react'
import './CoinTable.css'
import ReactTable from 'react-table'
import "react-table/react-table.css";
import GithubCorner from 'react-github-corner';
// import Nav from '../Nav'

import { Button, Input, Divider, Segment } from 'semantic-ui-react';

import { ModalManager } from 'react-dynamic-modal-v2';
import DetailsModal from '../Details/DetailsModal';

// For icons to show add semantic-ui-css as dependency
// and import 'semantic-ui-css/semantic.min.css' in index.js

import axios from 'axios'

class CoinTable extends Component {

  tempWatchlist = []
  savedWatchlist = []

  columns = [
    {
      columns: [
        {
          Header: () => (
            <div style={{
              fontWeight: "bold",
              textAlign: "left"
            }}>
              Symbol
              </div>
          ),
          accessor: 'symbol'
        },
        {
          Header: () => (
            <div style={{
              fontWeight: "bold",
              textAlign: "left"
            }}>
              Image
              </div>
          ),
          Cell: (row) => {
            return <div><img height={30} src={row.original.image} alt='coin' /></div>
          },
          id: "image"
        },
        {
          Header: () => (
            <div style={{
              fontWeight: "bold",
              textAlign: "left"
            }}>
              Name
              </div>
          ),
          accessor: 'name'
        },
        {
          Header: () => (
            <div style={{
              fontWeight: "bold",
              textAlign: "left"
            }}>
              Watchlist
              </div>
          ),
          id: 'watchlist',
          accessor: 'favorite',
          Cell: (row) => (<div>
            <Button
              size={'mini'}
              color={row.original.favorite ? 'orange' : 'twitter'}
              icon={row.original.favorite ? 'heart' : 'heart outline'}
              onClick={() => { this.toggleFave(row.original.symbol, row.original.favorite) }}

            />
            <Button
              circular
              size={'mini'}
              disabled={row.original.favorite ? false : true}
              color={row.original.favorite ? 'teal' : 'grey'}
              icon={'chart line'}
              onClick={() => this.openModal(row.original.symbol)}
            />
          </div>)
        }

      ]
    }
  ]

  state = {
    data: [],
    search: ''
  }


  openModal(coinName) {
    ModalManager.open(
      <DetailsModal coinName={coinName} onRequestClose={() => true} />
    );
  }

  // getWatchlist() {
  //   axios.get('/api/getWatchlist/' + this.props.userId).then(response => {
  //     this.tempWatchlist = response.data.coins
  //     // console.log('userid: ' + this.userId)
  //     // console.log('tempWatchlist: ' + JSON.stringify(this.tempWatchlist))
  //   }).catch(err => {
  //     console.log(err)
  //   });

  // }


  async getAllCoins() {
    let data = []

    await axios.get('/api/getWatchlist/' + this.props.userId).then(response => {
      this.savedWatchlist = response.data.coins
      this.tempWatchlist = JSON.parse(JSON.stringify(this.savedWatchlist))
    }).catch(err => {
      console.log(err)
    });


    await axios.get('/api/gettop100').then(response => {
      let coins = response.data
      let faves = this.savedWatchlist

      coins.forEach(coin => {
        let coinObj = {}

        coinObj.symbol = coin.symbol
        coinObj.name = coin.name
        coinObj.image = coin.image

        if (faves.length < 1) {
          coinObj.favorite = false
        }
        else {
          for (let i = 0; i < faves.length; i++) {
            if (faves[i].symbol === coinObj.symbol) {
              coinObj.favorite = true
              break;
            } else {
              coinObj.favorite = false
            }
          }
        }
        data.push(coinObj)
      })

      this.setState({ data: data })
    }).catch(err => {
      console.log(err)
    });
  }


  resetWatchlist() {
    this.getAllCoins()
  }


  saveWatchlist() {
    console.log(this.tempWatchlist !== this.savedWatchlist)
    if (this.tempWatchlist !== this.savedWatchlist) {
      axios.post('/api/updatewatchlist', {
        id: this.props.userId,
        watchlist: JSON.stringify({ coins: this.tempWatchlist })
      })
        .then(function (response) {
          console.log(response);
          console.log('Watchlist updated!')
        })
        .catch(function (error) {
          console.log(error);
        });
      this.getAllCoins()
    }
  }

  toggleFave(coinSymbol, faveStatus) {
    let watchlist = this.tempWatchlist
    let data = this.state.data

    if (faveStatus) {
      for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].symbol === coinSymbol) {
          watchlist.splice(i, 1);
          break;
        }
      }
    } else {
      let newFave = { symbol: coinSymbol }
      watchlist.push(newFave)
      this.tempWatchlist = watchlist
    }

    //Edit favorite status of coin
    for (let i = 0; i < data.length; i++) {
      if (data[i].symbol === coinSymbol) {
        data[i].favorite = !data[i].favorite
        break;
      }
    }
    this.setState({ data: data })
    // console.log('stateWL ' + JSON.stringify(this.savedWatchlist))
    // console.log('tempWL ' + JSON.stringify(this.tempWatchlist))
  }

  componentDidMount() {
    this.getAllCoins()
  }


  render() {
    let data = this.state.data

    if (this.state.search) {
      data = data.filter(row => {
        return row.symbol.includes(this.state.search) || row.name.includes(this.state.search)
      })
    }

    return (
      <div>
        {/* <GithubCorner
          href='https://github.com/rmoj/CryptoCurrent'
          // bannerColor="#64CEAA"
          bannerColor='#151513'
          octoColor="#fff"
          size={50}
          direction="right"
        />
         */}

        <Segment>
          <Input
            icon='search'
            placeholder='Search...'
            value={this.state.search} onChange={e => this.setState({ search: e.target.value })} />
          <Button size='tiny' color='teal' floated='right' onClick={() => this.saveWatchlist()}>Save Watchlist</Button>
          <Button size='tiny' color='orange' floated='right' onClick={() => this.getAllCoins()}>Reset</Button>
          <Divider />
          <ReactTable
            data={data}
            columns={this.columns}
            defaultPageSize={8}
            className={'-highlight'}
            getTdProps={() => ({
              style: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }
            })}
            sorted={[
              {
                id: 'watchlist',
                desc: true
              }
            ]}
          />
        </Segment>
      </div>
    )
  }
}

export default CoinTable;

import Phaser from 'phaser'

import Animations from '../utils/Animations'

import Splash from './Splash'

import minimongo from 'minimongo'
import bowser from 'bowser'

export default class Boot extends Phaser.State {
  init (props) {
    this.stage.backgroundColor = '#000'
  }

  loadStatic () {
    this.load.image('stars', './assets/texture_4.jpg')
    this.load.image('shipMain', './assets/shipMain.png')
    this.load.image('shipBigPart', './assets/shipBigPartN.png')
  }

  initDB () {
    this.isInited = false

    const database = (bowser.opera || bowser.chrome || bowser.msedge || bowser.firefox) ? minimongo.IndexedDb : minimongo.MemoryDb

    new database({}, (db) => {
      new Promise ((resolve, reject) => {
        db.removeCollection('levels', () => resolve(), (err) => reject(err))
      })
      .then(() => db.addCollection('levels', 
        () => 
          Promise.resolve(), 
        (err) => 
          Promise.reject(err)
      ))
      .then(() => {
        // Load game levels from json tilemap and save them to Local DB


        // let levelCount = 12

        // let urls = []

        // for (let i = 1; i <= levelCount; i++) {
        //   urls.push(`assets/maps/Level-${i}.json`)
        // }

        // Promise
        //   .all(urls.map(el => fetch(el)))
        //   .then(responses => Promise.all(responses.map(fetchLib.checkStatus)))
        //   .then(responses => Promise.all(responses.map(fetchLib.parseJSON)))
        //   .then(maps => {
        //     let levels = []
        //     maps.forEach((map, i) => {
        //       let localSettings = getLocalLevelSettings(i + 1)
        //       let level = {
        //         id: i + 1,
        //         title: `Level-${i + 1}`,
        //         desc: localSettings.description,
        //         map,
        //         resources: localSettings.items,
        //         timeout: localSettings.timeout || 60000 * 3,
        //         in: localSettings.in || 2,
        //         out: localSettings.out || 2
        //       }

        //       levels.push(level)
        //     })

            let levelsQueries = [] /*levels.map(level => {
              return new Promise((resolve, reject) => {
                db.levels.upsert(level, doc => {return resolve(doc)}, err => {return reject(err)})
              })
            })*/

            return Promise.all(levelsQueries)
          })
          .then((docs) => {
            console.log('Local levels added without errors!')

            this.isInited = true

            this.game.localDB = db
            this.isInited = true
          })
          .catch((err) => {
            console.error('loading maps Error:', err, err.stack)
          })
      })
  }

  preload () {
    this.loadStatic()
    this.initDB()

    this.game.animations = new Animations(this.game)
  }

  render () {
    if (this.isInited)
      this.state.start('Splash')
  }

}

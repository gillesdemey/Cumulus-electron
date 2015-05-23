'use strict';

var McFly            = require('../utils/mcfly')
var SoundCloud       = require('../utils/soundcloud')

var CurrenTrackStore = require('../stores/currentTrackStore')

var actions

window.require('ipc').on('GlobalShortcuts', function(accelerator) {
  switch (accelerator) {

    case 'MediaPlayPause':
      if (CurrenTrackStore.getAudio().paused)
        actions.playTrack()
      else
        actions.pauseTrack()
      break

    case 'MediaPreviousTrack':
      actions.previousTrack()
      break

    case 'MediaNextTrack':
      actions.nextTrack()
      break

  }

})

actions = McFly.createActions({

  /**
   * Tracks
   */
  playTrack: function(track) {
    return {
      'actionType' : 'PLAY_TRACK',
      'track'      : track
    }
  },

  pauseTrack: function() {
    return {
      'actionType' : 'PAUSE_TRACK'
    }
  },

  seekTrack: function(seconds) {
    if (isFinite(seconds))
      return {
        'actionType' : 'SEEK_TRACK',
        'time'       : seconds
      }
  },

  nextTrack: function() {
    return {
      'actionType' : 'NEXT_TRACK'
    }
  },

  previousTrack: function() {
    return {
      'actionType' : 'PREVIOUS_TRACK'
    }
  },

  /**
   * Playlist
   */
  setPlaylist: function(tracks) {
    return {
      'actionType' : 'SET_PLAYLIST',
      'tracks'     : tracks
    }
  },

  addToPlaylist: function(tracks) {
    return {
      'actionType' : 'ADD_TO_PLAYLIST',
      'tracks'     : tracks
    }
  },

  /**
   * Collections
   */
  fetchCollection: function() {
    return SoundCloud.fetchCollection()
      .then(function(items) {
         return {
          'actionType' : 'LOADED_COLLECTION',
          'collection' : items
        }
      })
  }

})

module.exports = actions

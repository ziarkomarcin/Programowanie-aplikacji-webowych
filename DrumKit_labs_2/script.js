var available_tracks = 4;
var music_button = document.getElementsByClassName('music_button');
var Drums = /** @class */ (function () {
    function Drums() {
        var _this = this;
        this.sounds_array = [];
        document.querySelectorAll('audio').forEach(function (sound) {
            _this.sounds_array.push(sound);
        });
        new DrumsUI(this.sounds_array);
    }
    return Drums;
}());
var DrumsUI = /** @class */ (function () {
    function DrumsUI(sounds_array) {
        var _this = this;
        this.tracks = [[]];
        this.sounds_array = [];
        this.sounds_buttons = [];
        this.track_elements = [];
        this.track_activated = null;
        this.sounds_array = sounds_array.map(function (element) { return ({
            element: element,
            key: element.dataset.key
        }); });
        document.body.addEventListener('keypress', function (ev) { return _this.enable_sound(ev); });
        this.useTracks();
    }
    DrumsUI.prototype.enable_sound = function (ev) {
        var key = ev.key;
        var time = ev.timeStamp;
        if (this.track_activated !== null) {
            this.tracks[this.track_activated].push({
                key: key,
                time: time
            });
        }
        this.make_music(key);
    };
    DrumsUI.prototype.make_music = function (key) {
        if (key === void 0) { key = null; }
        if (key) {
            var element = this.sounds_array.find(function (v) { return v.key === key; }).element;
            element.currentTime = 0;
            element.play();
        }
    };
    DrumsUI.prototype.useTracks = function () {
        var _this = this;
        var _loop_1 = function (a) {
            var track_div = document.getElementById('track_div');
            var rec_button = document.createElement('button');
            rec_button.className = "rec_button";
            rec_button.addEventListener('click', function (ev) { return _this.activeTrack(a, ev); });
            rec_button.innerHTML = "<p>REC</p>";
            track_div.appendChild(rec_button);
            var play_button = document.createElement('button');
            play_button.className = "play_button";
            play_button.disabled = true;
            play_button.innerHTML = "<p>PLAY</p>";
            play_button.addEventListener('click', function (ev) { return _this.stopAndPlay(a); });
            track_div.appendChild(play_button);
            var breakline = document.createElement('br');
            track_div.appendChild(breakline);
            this_1.track_elements.push({
                play_button: play_button,
                rec_button: rec_button
            });
        };
        var this_1 = this;
        for (var a = 0; a < available_tracks; a++) {
            _loop_1(a);
        }
    };
    DrumsUI.prototype.activeTrack = function (track_number, event) {
        this.tracks[track_number] = [{
                time: event.timeStamp,
                key: null
            }];
        this.track_activated = track_number;
        this.track_elements.forEach(function (el) {
            el.rec_button.disabled = true;
        });
        this.track_elements[track_number].play_button.disabled = false;
    };
    DrumsUI.prototype.stopAndPlay = function (track_number) {
        var _this = this;
        if (this.track_activated === track_number) {
            this.recSTOP(track_number);
        }
        else {
            // play
            var track = this.tracks[track_number];
            var previous_1 = track[0].time;
            track.forEach(function (sound) {
                var time = sound.time - previous_1;
                setTimeout(function () {
                    _this.make_music(sound.key);
                }, time);
            });
        }
    };
    DrumsUI.prototype.recSTOP = function (track_number) {
        var track = this.tracks[track_number];
        var recorded = track[track.length - 1].time - track[0].time;
        this.track_elements.forEach(function (el) {
            el.rec_button.disabled = false;
        });
        if (recorded) {
            track.splice(0, 1).forEach(function (sound) {
                var time_lapse = document.createElement('time');
                var time_prc = (sound.time - track[0].time) / recorded * 100;
                console.log(time_prc);
                time_lapse.className = "time_lapse";
                time_lapse.style.left = time_prc + "%";
            });
        }
        else {
            this.track_elements[track_number].play_button.disabled = true;
        }
        this.track_activated = null;
    };
    return DrumsUI;
}());
var drums = new Drums();

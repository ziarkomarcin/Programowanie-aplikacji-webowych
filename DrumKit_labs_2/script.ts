interface ISoundElement {
    element: HTMLAudioElement,
    key: string
}

interface ISound {
    key: string,
    time: number
}

const available_tracks = 4;
const music_button = document.getElementsByClassName('music_button');

class Drums {
    sounds_array: Array<HTMLAudioElement> = [];
    constructor() {
        document.querySelectorAll('audio').forEach((sound) => {
            this.sounds_array.push(sound);
        })
        new DrumsUI(this.sounds_array);
    }
}

class DrumsUI {
    tracks: ISound[][] = [[]];
    sounds_array: ISoundElement[] = [];
    sounds_buttons: HTMLButtonElement[] = [];
    track_elements: {
        play_button: HTMLButtonElement,
        rec_button: HTMLButtonElement
    }[] = [];
    track_activated: number = null;
    constructor(sounds_array: HTMLAudioElement[]) {
        this.sounds_array = sounds_array.map((element) => ({
            element,
            key: element.dataset.key
        }));  
        document.body.addEventListener('keypress', (ev) => this.enable_sound(ev));
        this.useTracks();
    }

    enable_sound(ev: KeyboardEvent) {
        const key = ev.key;
        const time = ev.timeStamp;
        if (this.track_activated !== null) {
            this.tracks[this.track_activated].push({
                key: key,
                time: time
            });
        }
        this.make_music(key);
    }

    make_music(key: string = null) {
        if (key) {
            const element = this.sounds_array.find((v) => v.key === key).element;
            element.currentTime = 0;
            element.play();
        }
    }

    useTracks() {
        for (let a = 0; a < available_tracks; a++) {
            const track_div = document.getElementById('track_div');

                const rec_button = document.createElement('button');
                rec_button.className = `rec_button`;
                rec_button.addEventListener('click', (ev) => this.activeTrack(a, ev));
                rec_button.innerHTML = "<p>REC</p>"
                track_div.appendChild(rec_button);
            
                    const play_button = document.createElement('button');
                    play_button.className = `play_button`;
                    play_button.disabled = true;
                    play_button.innerHTML = "<p>PLAY</p>";
                    play_button.addEventListener('click', (ev) => this.stopAndPlay(a));
                    track_div.appendChild(play_button);

                const breakline = document.createElement('br');
                track_div.appendChild(breakline);

                    this.track_elements.push({
                        play_button,
                        rec_button
                    });
        }
    }

    activeTrack(track_number: number, event: MouseEvent) {
        this.tracks[track_number] = [{
            time: event.timeStamp,
            key: null
        }];
        this.track_activated = track_number;
        this.track_elements.forEach(el => {
            el.rec_button.disabled = true;
        })
        this.track_elements[track_number].play_button.disabled = false;
    }

    stopAndPlay(track_number: number) {
        if (this.track_activated === track_number) {
            this.recSTOP(track_number);
        }
        else {
            const track = this.tracks[track_number];
            let previous = track[0].time;

            track.forEach((sound: ISound) => {
                const time = sound.time - previous;
                setTimeout(() => {
                    this.make_music(sound.key);
                }, time);
            })
        }
    }

    recSTOP(track_number: number) {
        const track = this.tracks[track_number];
        const recorded = track[track.length - 1].time - track[0].time;
        this.track_elements.forEach(el => {
            el.rec_button.disabled = false;
        })
        if (recorded) {
            track.splice(0,1).forEach((sound: ISound) => {
                const time_lapse = document.createElement('time');
                const time_prc = (sound.time - track[0].time) / recorded * 100;
                console.log(time_prc)
                time_lapse.className = "time_lapse";
                time_lapse.style.left = `${time_prc}%`;
            })
        } else {
            this.track_elements[track_number].play_button.disabled = true;
        }
        this.track_activated = null;
    }
}

const drums = new Drums();

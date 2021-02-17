export default class PeakAnalyzer {
  audioCtx = new AudioContext();

  analyze(url: string, peakLength: number): Promise<number[][]> {
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "arraybuffer";
    console.log(req);
    req.send();

    return new Promise((resolve, reject) => {
      req.onload = async () => {
        if (req.status === 200) {
          console.log(req.status);
          const peaks = await this.onLoadSound(req.response, peakLength);
          resolve(peaks);
        } else {
          console.log(req.status);
          reject(req.statusText);
        }
      };
    });
  }

  async onLoadSound(audioData: ArrayBuffer, peakLength: number): Promise<number[][]> {
    console.log("N");

    const buf = await this.audioCtx.decodeAudioData(audioData);

    const chPeaksArray: number[][] = [];
    for (let i=0; i<buf.numberOfChannels; i++) {
      const ch = buf.getChannelData(i);
      const peaks = this.getPeaks(ch, peakLength);
      chPeaksArray.push(peaks);
    }

    return chPeaksArray;
  }

  getPeaks(array: Float32Array, peakLength: number): number[] {
    let step;
    peakLength ??= 9000;

    step = Math.floor(array.length / peakLength);

    if (step < 1) step = 1;

    const peaks: number[] = [];
    for (let i=0, len = array.length; i < len; i += step) {
      const peak = this.getPeak(array, i, i + step);
      peaks.push(peak);
    }

    return peaks;
  }

  getPeak(array: Float32Array, startIndex: number, endIndex: number): number {
    const sliced = array.slice(startIndex, endIndex);

    let peak = -100;
    for (let i=0, len = sliced.length; i<len; i++) {
      const sample = sliced[i];
      if (sample > peak) {
        peak = sample;
      }
    }

    return peak;
  }
}

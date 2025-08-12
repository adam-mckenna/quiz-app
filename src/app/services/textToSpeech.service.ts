import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class TtsService {
  private token = environment.ttsToken;

  constructor(private http: HttpClient) {}

  speak(text: string) {
    const body = {
      input: { text },
      voice: { languageCode: 'en-GB', name: 'en-GB-Chirp3-HD-Enceladus' },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: 1.2,
      },
    };

    return this.http.post(
      'https://texttospeech.googleapis.com/v1beta1/text:synthesize',
      body,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      },
    );
  }
}

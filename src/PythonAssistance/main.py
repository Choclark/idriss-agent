import speech_recognition as sr
import re
import requests

def listen_for_query():
    recognizer = sr.Recognizer()
    microphone = sr.Microphone()

    with microphone as source:
        print("Listening for your command...")
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.listen(source)

    try:
        query = recognizer.recognize_google(audio)
        print("You said:", query)
        return query
    except sr.UnknownValueError:
        print("Sorry, I could not understand the audio.")
        return None
    except sr.RequestError:
        print("Sorry, the speech service is unavailable.")
        return None

def process_query(query: str):
    query = query.lower()
    if 'write me something with' in query:
        match = re.search(r'write me something with (\w+)', query)
        if match:
            word = match.group(1)
            print(f"Writing something with the word: {word}")
            return word
        else:
            print("No word found after 'with'.")
            return None
    else:
        print("Query doesn't match the expected format.")
        return None

def send_to_backend(word: str):
    backend_url = "http://your-backend-url.com/generate_text"
    response = requests.post(backend_url, json={"word": word})
    
    if response.status_code == 200:
        print("Backend Response:", response.text)
    else:
        print("Failed to get response from backend.")

def main():
    while True:
        print("Say your query...")
        query = listen_for_query()
        if query:
             process_query(query)

main()


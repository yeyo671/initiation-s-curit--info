import json
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

DATA_FILE = 'messages.json'


def load_messages():
    try:
        with open(DATA_FILE, 'r') as f:
            messages = json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        messages = []
    return messages


def save_message(user, content):
    messages = load_messages()
    messages.append({'user': user, 'content': content})
    with open(DATA_FILE, 'w') as f:
        json.dump(messages, f, indent=4)


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user = request.form['user']
        content = request.form['content']
        # Enregistrer le message sans échapper le contenu, ce qui crée la vulnérabilité XSS
        save_message(user, content)
        return redirect(url_for('index'))

    # Charger les messages et ne pas échapper le contenu pour permettre l'injection de script
    messages = load_messages()
    return render_template('index.html', messages=messages)


if __name__ == "__main__":
    app.run(debug=True)

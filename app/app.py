from flask import Flask, request, render_template_string
import mysql.connector

app = Flask(__name__)


# Configurer la connexion à la base de données MySQL
def get_db_connection():
    connection = mysql.connector.connect(
        host="db", user="root", password="password", database="testdb"
    )
    return connection


@app.route("/")
def home():
    return """
        <h1>Recherche de données</h1>
        <form method="POST" action="/search_user">
            <h3>Recherche d'utilisateur par nom</h3>
            <input type="text" name="username" placeholder="Nom d'utilisateur">
            <button type="submit">Rechercher</button>
        </form>
        
        <form method="POST" action="/search_transactions">
            <h3>Recherche de transactions par utilisateur ID</h3>
            <input type="text" name="user_id" placeholder="ID d'utilisateur">
            <button type="submit">Rechercher</button>
        </form>

        <form method="POST" action="/search_profile">
            <h3>Recherche de profil par nom d'utilisateur</h3>
            <input type="text" name="username" placeholder="Nom d'utilisateur">
            <button type="submit">Rechercher</button>
        </form>
    """


@app.route("/search_user", methods=["POST"])
def search_user():
    username = request.form["username"]

    # Requête SQL vulnérable à l'injection
    query = f"SELECT * FROM users WHERE username = '{username}'"

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query)

    results = cursor.fetchall()
    conn.close()

    if results:
        return render_template_string(
            "<h1>Résultat utilisateur:</h1><p>{{results}}</p>", results=results
        )
    else:
        return "Aucun utilisateur trouvé."


@app.route("/search_transactions", methods=["POST"])
def search_transactions():
    user_id = request.form["user_id"]

    # Requête SQL vulnérable à l'injection pour les transactions
    query = f"SELECT * FROM transactions WHERE user_id = {user_id}"

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query)

    results = cursor.fetchall()
    conn.close()

    if results:
        return render_template_string(
            "<h1>Résultat des transactions:</h1><p>{{results}}</p>", results=results
        )
    else:
        return "Aucune transaction trouvée."


@app.route("/search_profile", methods=["POST"])
def search_profile():
    username = request.form["username"]

    # Requête SQL vulnérable à l'injection pour le profil utilisateur
    query = f"""
        SELECT p.first_name, p.last_name, p.address, p.phone, p.birthdate
        FROM profiles p
        JOIN users u ON p.user_id = u.id
        WHERE u.username = '{username}'
    """

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(query)

    results = cursor.fetchall()
    conn.close()

    if results:
        return render_template_string(
            "<h1>Profil de l'utilisateur:</h1><p>{{results}}</p>", results=results
        )
    else:
        return "Aucun profil trouvé."


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

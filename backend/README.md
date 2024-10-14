# GeoGuide Backend

## Prerequisites
To run this app, ensure you have the following installed:
- Python 3.x
- Python libraries (requirements.txt)
- Pip

## Installation

1. Clone the GitHub repository:
   ```bash
   git clone https://github.com/PjayEvangelio/GeoGuide.git
   ```

2. Navigate to the backend directory:
   ```bash
   cd GeoGuide/backend
   ```

3. Delete any existing virtual environment folder (if applicable):
   - If you see a `venv` folder, delete it to avoid conflicts.

4. Create a virtual environment:
   ```bash
   python3 -m venv venv
   ```

5. Activate the virtual environment:
   - On macOS and Linux:
   ```bash
   source venv/bin/activate
   ```

   - On Windows:
   ```bash
   venv\Scripts\activate
   ```

6. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

7. Run the development server:
   ```bash
   python3 manage.py runserver
   ```

8. Access the admin interface:
   - You can access the admin interface at http://localhost:8000/admin/

9. Access the countrysource API interface:
   - You can access the countrysource API interface at http://127.0.0.1:8000/countrysource/api/countries/

## Database

The SQLite database file (`db.sqlite3`) is included in the project. No further migrations are necessary unless changes are made to the models.
In that case, run the following command to apply any migrations:
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

## Creating a Superuser

If you need to create a superuser, you can do so by running:
```bash
python3 manage.py createsuperuser
```

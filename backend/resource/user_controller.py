import hashlib

def users():
    return [
        '95d910755c85994d50cad635a27d7bce'
    ]

def encode_user(user, password):
    hash_object = hashlib.md5(
        f'{user}:{password}'.encode()
    )
    return hash_object.hexdigest()

def valid_user(user, password):
    user_id = encode_user(user, password)
    found = user_id in users()
    return found, user_id

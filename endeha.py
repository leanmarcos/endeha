
# ---------------------------------------------cesar-encrypt---------------------------------------------------
def cesar():
    
    print("Please insert the original message")
    original_text = input().replace(" ", "").lower()

    if original_text.isalpha():

        

        print("Now insert the amount of position that will be moved")
        try:
            new_position = int(input())
        except ValueError:
             print("❌ Please insert a real number")
             return
        
        new_text = []
        
        for x in original_text:
                new_letter = chr((ord(x) - ord('a') + new_position) % 26 + ord('a'))
                new_text.append(new_letter)


        
        print("✅ Encripted! Result: ", "".join(new_text))
    else:
        print("❌ Only letters")

def atbash():
     print("Please insert the original message")
     original_message = input().lower().replace(" " , "")
     encrypted_message = []

     if  original_message.isalpha():
            for x in original_message:
                new_letter = chr((ord('z') - ord(x)) % 26 + ord('a'))
                encrypted_message.append(new_letter)
            print("✅ Encrypted! Result: " , "".join(encrypted_message))
     else:
        print("❌ Invalid option")


def vignere():
    print("Please insert the original message")
    original_message = input().lower().replace(" " , "")

    if not original_message.isalpha():
        print("❌ Invalid message")
        return   
        

    else:
        print("Please, insert password")
        password = input().lower().replace(" ", "")
         
        if password.isalpha():
            new_message = []
            new_password = []

            repeated_password = (password * ((len(original_message) // len(password)) + 1))[:len(original_message)]
            
            for x in range (0, len(repeated_password)):
                 coded_letter = chr((ord(original_message[x]) - ord('a') + ord(repeated_password[x]) - ord('a')) % 26 + ord('a'))
                 new_message.append(coded_letter)
            
            print("✅ Encrypted! Result: " , "".join(new_message))

        else:
            print("Please, insert an actual password")

def transposition_cipher():
    print("Please insert the original message")
    original_message = input().lower().replace(" ", "")

    if not original_message.isalpha():
        print("❌ Please, a real message, only letters")
        return
    
    print("Insert the key")
    key_path = input().replace(" ", "")
    organization = key_path.split(",")


    try:
        organization = [int(x) - 1 for x in organization]  
    except ValueError:
        print("❌ Only numbers, please")
        return
    
    
    message_by_parts = divide_by_parts(original_message, len(organization)) 

    result = [] 
    for part in message_by_parts: 
        row = [part[i] for i in organization] 
        result.append("".join(row))

    encrypted = "".join(result)
    print("✅ Encrypted! Result:", encrypted)

    


def divide_by_parts(texto, n, relleno="x"):
    while len(texto) % n != 0:
        texto += relleno
    return [texto[i:i+n] for i in range(0, len(texto), n)]


def divide_by_parts(texto, n, relleno="x"):
    while len(texto) % n != 0:
        texto += relleno
    return [texto[i:i+n] for i in range(0, len(texto), n)]




def encrypt():

    print("Please select the type of Encryption you want \n1 - Cesar\n2 - Atbash\n3 - Vignere\n4 - Transposition Cipher")
    try:
          user_election = int(input())
    except ValueError:
          print("Please, choose on the options above")
          return
    
    match user_election:
         case 1:
              cesar()
         case 2:
              atbash()
         case 3:
              vignere()
         case 4:
              transposition_cipher()
         case default:
              print("Invalid option")

# -------------------------------------------------decrypt---------------------------------------------------
def cesar_decrypt():
    print("Insert the encripted message")
    encripted_message = input().lower()

    
    if not encripted_message.isalpha():
         return print("❌ Please, insert a real cesar")
    
    else:

        print("select the amount of places")
        try:
            amt_places = int(input())
        except ValueError:
             print("❌ Please insert a real number")
             return

        original_message = []

        for x in encripted_message:
                word_reveal = chr((ord(x) - ord('a') - amt_places) % 26 + ord('a'))
                original_message.append(word_reveal)

        print("✅ Solved! Result: " + "".join(original_message))

    

# ------------------------------------------------hashing---------------------------------------------------
def python_hash(original_text):
    final_text = hash(original_text)

    print("✅ Hashed! Result: " , final_text)

def md5_hash(original_text):
    import hashlib
    hashed_text = hashlib.md5(original_text.encode()).hexdigest()
    print("✅ Hashed! Result: " , hashed_text)

def sha_256_hash(original_text):
    import hashlib
    hashed_text = hashlib.sha256(original_text.encode()).hexdigest()
    print("✅ Hashed! Result: " , hashed_text) 
    
def hashing(client_selection):
    print("Insert the original text")
    original_text = input()
    match client_selection:
        case 1:
            python_hash(original_text)
        case 2:
            md5_hash(original_text)
        case 3:
            sha_256_hash(original_text)
   

# ------------------------------------------------Beggining------------------------------------------------
type = -1

while(type != 0):
    
    print("\n1 - Encrypt\n2 - Decrypt\n3 - Hashing\n0 - Exit")
    try:
            type = int(input())
    except ValueError:
            print("❌ Only numbers, please")
        

    match type:
        case 1:
            encrypt()
        case 2:
            cesar_decrypt()
        case 3:
            print("Select the hashing type")
            print("1 - Python hash (not secure)\n2 - md5\n3 - SHA-256")
            
            try: 
                election = int(input())
            except ValueError:
                print("❌ Please insert a real number")
                continue
                
            hashing(election)
        case 0:
            print("End. Thanks for using")
        case default:
            print("❌ Please, select one of the options above")

    
import cv2
import numpy as np

image_path = 'images/duck_edited_edited_edited.png'  
image = cv2.imread(image_path)

santa_hat_path = 'images/santahat.png'  
santa_hat = cv2.imread(santa_hat_path, -1)

if santa_hat is not None:
    hat_height, hat_width = santa_hat.shape[:2]

    x, y = 50, 50

    roi = image[y:y+hat_height, x:x+hat_width]
    result = cv2.addWeighted(roi, 1, santa_hat, 1, 0)

    
    image[y:y+hat_height, x:x+hat_width] = result

    cv2.imshow('Papera con Cappello di Babbo Natale', image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
else:
    print("Errore nel caricamento dell'immagine del cappello.")


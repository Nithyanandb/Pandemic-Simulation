package com.pandemicsimulation.in.Config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    // Path to Firebase service account credentials JSON file
    // URL of the Firebase Realtime Database

// 1. Method to create and return the FirebaseDatabase instance
// Check if Firebase is already initialized, if not, initialize it

// 2. Method to create and return the DatabaseReference instance
// Getting the reference to the Firebase Database

// 3. Initialize Firebase with credentials and database URL
// If initialization fails, print error and throw exception

    private static final String FIREBASE_CREDENTIALS_PATH = "src/main/java/com/pandemicsimulation/in/Config/coviddata-5088f-firebase-adminsdk-8xooi-6649dbfd1c.json";



    private static final String DATABASE_URL = "https://coviddata-5088f-default-rtdb.firebaseio.com";

    @Bean
    public FirebaseDatabase firebaseDatabase() throws IOException {

        if (FirebaseApp.getApps().isEmpty()) {
            initializeFirebase();
        }
        return FirebaseDatabase.getInstance();
    }

    @Bean
    public DatabaseReference databaseReference() throws IOException {
        return firebaseDatabase().getReference();
    }

    private void initializeFirebase() throws IOException {
        try (FileInputStream serviceAccount = new FileInputStream(FIREBASE_CREDENTIALS_PATH)) {
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .setDatabaseUrl(DATABASE_URL)
                    .build();
            FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to initialize Firebase", e);
        }
    }

}

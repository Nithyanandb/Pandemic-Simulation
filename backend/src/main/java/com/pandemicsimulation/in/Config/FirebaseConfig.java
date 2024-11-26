package com.pandemicsimulation.in.Config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
@Configuration
public class FirebaseConfig {

    @Value("${firebase.credentials-file}")
    private String encodedCredentialsFile;

    @Value("${firebase.database-url}")
    private String databaseUrl;

    @Bean
    public FirebaseApp firebaseApp() {
        try {
            // to Decode the base64 string to get the credentials file
            InputStream credentialsStream = decodeBase64(encodedCredentialsFile);

            // Initializing Firebase with credentials and the database URL
            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(credentialsStream))
                    .setDatabaseUrl(databaseUrl)
                    .build();

            return FirebaseApp.initializeApp(options);
        } catch (IOException e) {
            throw new RuntimeException("Failed to initialize Firebase", e);
        }
    }

    @Bean
    public DatabaseReference databaseReference() {
        try {
            FirebaseApp app = firebaseApp();
            FirebaseDatabase database = FirebaseDatabase.getInstance(app);
            return database.getReference();
        } catch (Exception e) {
            throw new RuntimeException("Failed to get DatabaseReference", e);
        }
    }

    //this is converting the base64 string to InputStream
    private InputStream decodeBase64(String encodedString) {
        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        return new ByteArrayInputStream(decodedBytes);
    }
}
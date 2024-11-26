package com.pandemicsimulation.in.Config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;

@Configuration
public class FirebaseConfig {

//    @Value("${firebase.credentials-file}")
//    private String encodedCredentialsFile;  // The base64-encoded credentials string
//
//    @Value("${firebase.database-url}")
//    private String databaseUrl;  // Firebase Realtime Database URL

    private String encodedCredentialsFile = System.getenv("FIREBASE_CREDENTIALS");
    private String databaseUrl = System.getenv("FIREBASE_DATABASE_URL");

    @Bean
    public FirebaseApp firebaseApp() throws IOException {
        // Decode the base64 string to get the credentials file
        InputStream credentialsStream = decodeBase64(encodedCredentialsFile);

        // Initialize Firebase with credentials and the database URL
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(credentialsStream))
                .setDatabaseUrl(databaseUrl)
                .build();

        return FirebaseApp.initializeApp(options);
    }

    // Helper method to decode base64 string to InputStream
    private InputStream decodeBase64(String encodedString) {
        byte[] decodedBytes = Base64.getDecoder().decode(encodedString);
        return new ByteArrayInputStream(decodedBytes);
    }
}

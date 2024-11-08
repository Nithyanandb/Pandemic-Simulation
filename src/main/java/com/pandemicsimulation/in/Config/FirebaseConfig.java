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

    @Bean
    public FirebaseDatabase firebaseDatabase() throws IOException {
        String filePath = "src/main/java/com/pandemicsimulation/in/Config/coviddata-5088f-firebase-adminsdk-6tgrn-99aed65a84.json";

        // Initialize Firebase only if not already done
        if (FirebaseApp.getApps().isEmpty()) {
            try (FileInputStream serviceAccount = new FileInputStream(filePath)) {
                FirebaseOptions options = new FirebaseOptions.Builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setDatabaseUrl("https://coviddata-5088f-default-rtdb.firebaseio.com") // Corrected URL
                        .build();
                FirebaseApp.initializeApp(options);
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("Failed to initialize Firebase", e);
            }
        }

        return FirebaseDatabase.getInstance();
    }

    @Bean
    public DatabaseReference databaseReference() throws IOException {
        return firebaseDatabase().getReference();
    }
}

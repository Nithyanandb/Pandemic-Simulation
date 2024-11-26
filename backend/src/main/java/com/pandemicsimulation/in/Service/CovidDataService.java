package com.pandemicsimulation.in.Service;

import com.pandemicsimulation.in.Model.CovidData;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.ValueEventListener;
import com.google.firebase.database.DatabaseError;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;


    @Service
    public class CovidDataService {
        private final DatabaseReference databaseReference;

        @Autowired
        public CovidDataService(DatabaseReference databaseReference) {
            this.databaseReference = databaseReference;
        }

        public CompletableFuture<List<CovidData>> fetchAllCovidData() {
            CompletableFuture<List<CovidData>> future = new CompletableFuture<>();

            databaseReference.child("coviddata/js").addListenerForSingleValueEvent(new ValueEventListener() {
                @Override
                public void onDataChange(DataSnapshot dataSnapshot) {
                    List<CovidData> covidDataList = new ArrayList<>();
                    // Iterate over the children in the 'js' node
                    for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                        CovidData covidData = snapshot.getValue(CovidData.class);
                        if (covidData != null) {
                            covidDataList.add(covidData);
                        }
                    }
                    future.complete(covidDataList);
                }

                @Override
                public void onCancelled(DatabaseError databaseError) {
                    future.completeExceptionally(databaseError.toException());
                }
            });

            return future;
        }

    }
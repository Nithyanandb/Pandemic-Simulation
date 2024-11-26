package com.pandemicsimulation.in.Model;

public class CovidData {

    private String CountryRegion;
    private int Confirmed;
    private int Deaths;
    private int Recovered;
    private int Active;
    private int NewCases;
    private int newDeaths;
    private int NewRecovered;
    private double DeathsPer100;
    private double RecoveredPer100;
    private double DeathsPer100Recovered;
    private int confirmedLastWeek;
    private int oneweekchange;
    private double oneweekincrease;
    private String WHORegion;

    public String getCountryRegion() {
        return CountryRegion;
    }

    public void setCountryRegion(String countryRegion) {
        CountryRegion = countryRegion;
    }

    public int getConfirmed() {
        return Confirmed;
    }

    public void setConfirmed(int confirmed) {
        Confirmed = confirmed;
    }

    public int getDeaths() {
        return Deaths;
    }

    public void setDeaths(int deaths) {
        Deaths = deaths;
    }

    public int getRecovered() {
        return Recovered;
    }

    public void setRecovered(int recovered) {
        Recovered = recovered;
    }

    public int getActive() {
        return Active;
    }

    public void setActive(int active) {
        Active = active;
    }

       public int getNewDeaths() {
        return newDeaths;
    }

    public void setNewDeaths(int newDeaths) {
        this.newDeaths = newDeaths;
    }

    public int getNewRecovered() {
        return NewRecovered;
    }

    public void setNewRecovered(int newRecovered) {
        NewRecovered = newRecovered;
    }

    public double getRecoveredPer100() {
        return RecoveredPer100;
    }

    public void setRecoveredPer100(double recoveredPer100) {
        RecoveredPer100 = recoveredPer100;
    }

    public double getDeathsPer100Recovered() {
        return DeathsPer100Recovered;
    }

    public void setDeathsPer100Recovered(double deathsPer100Recovered) {
        DeathsPer100Recovered = deathsPer100Recovered;
    }

    public int getNewCases() {
        return NewCases;
    }

    public void setNewCases(int newCases) {
        this.NewCases = newCases;
    }

    public double getDeathsPer100() {
        return DeathsPer100;
    }

    public void setDeathsPer100(double deathsPer100) {
        DeathsPer100 = deathsPer100;
    }

    public int getConfirmedLastWeek() {
        return confirmedLastWeek;
    }

    public void setConfirmedLastWeek(int confirmedLastWeek) {
        this.confirmedLastWeek = confirmedLastWeek;
    }

    public int getOneweekchange() {
        return oneweekchange;
    }

    public void setOneweekchange(int oneweekchange) {
        this.oneweekchange = oneweekchange;
    }

    public double getOneweekincrease() {
        return oneweekincrease;
    }

    public void setOneweekincrease(double oneweekincrease) {
        this.oneweekincrease = oneweekincrease;
    }

    public String getWHORegion() {
        return WHORegion;
    }

    public void setWHORegion(String WHORegion) {
        this.WHORegion = WHORegion;
    }
}

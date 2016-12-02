package com.endava.spring.model;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by nicasandra on 12/2/2016.
 */
@Entity
public class CityCache {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;

    @Column(columnDefinition = "DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    private String icon;
    private String dayName;
    private Integer temp;
    private Integer feels;
    private Integer min;
    private Integer max;
    private Integer humidity;
    private Double rainfall;
    private Double windSpeed;
    private String sunrise;
    private String sunset;
    private String moonrise;
    private String moonset;

    @Column(columnDefinition = "DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date saveDate;

    @Override
    public String toString() {
        return "CityCache{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", date=" + date +
                ", icon='" + icon + '\'' +
                ", dayName='" + dayName + '\'' +
                ", temp=" + temp +
                ", feels=" + feels +
                ", min=" + min +
                ", max=" + max +
                ", humidity=" + humidity +
                ", rainfall=" + rainfall +
                ", windSpeed=" + windSpeed +
                ", sunrise='" + sunrise + '\'' +
                ", sunset='" + sunset + '\'' +
                ", moonrise='" + moonrise + '\'' +
                ", moonset='" + moonset + '\'' +
                ", saveDate=" + saveDate +
                '}';
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getDayName() {
        return dayName;
    }

    public void setDayName(String dayName) {
        this.dayName = dayName;
    }

    public Integer getTemp() {
        return temp;
    }

    public void setTemp(Integer temp) {
        this.temp = temp;
    }

    public Integer getFeels() {
        return feels;
    }

    public void setFeels(Integer feels) {
        this.feels = feels;
    }

    public Integer getMin() {
        return min;
    }

    public void setMin(Integer min) {
        this.min = min;
    }

    public Integer getMax() {
        return max;
    }

    public void setMax(Integer max) {
        this.max = max;
    }

    public Integer getHumidity() {
        return humidity;
    }

    public void setHumidity(Integer humidity) {
        this.humidity = humidity;
    }

    public Double getRainfall() {
        return rainfall;
    }

    public void setRainfall(Double rainfall) {
        this.rainfall = rainfall;
    }

    public Double getWindSpeed() {
        return windSpeed;
    }

    public void setWindSpeed(Double windSpeed) {
        this.windSpeed = windSpeed;
    }

    public String getSunrise() {
        return sunrise;
    }

    public void setSunrise(String sunrise) {
        this.sunrise = sunrise;
    }

    public String getSunset() {
        return sunset;
    }

    public void setSunset(String sunset) {
        this.sunset = sunset;
    }

    public String getMoonrise() {
        return moonrise;
    }

    public void setMoonrise(String moonrise) {
        this.moonrise = moonrise;
    }

    public String getMoonset() {
        return moonset;
    }

    public void setMoonset(String moonset) {
        this.moonset = moonset;
    }

    public Date getSaveDate() {
        return saveDate;
    }

    public void setSaveDate(Date saveDate) {
        this.saveDate = saveDate;
    }

    public CityCache() {

    }

    public CityCache(String name, Date date, String icon, String dayName, Integer temp, Integer feels, Integer min, Integer max, Integer humidity, Double rainfall, Double windSpeed, String sunrise, String sunset, String moonrise, String moonset, Date saveDate) {

        this.name = name;
        this.date = date;
        this.icon = icon;
        this.dayName = dayName;
        this.temp = temp;
        this.feels = feels;
        this.min = min;
        this.max = max;
        this.humidity = humidity;
        this.rainfall = rainfall;
        this.windSpeed = windSpeed;
        this.sunrise = sunrise;
        this.sunset = sunset;
        this.moonrise = moonrise;
        this.moonset = moonset;
        this.saveDate = saveDate;
    }
}

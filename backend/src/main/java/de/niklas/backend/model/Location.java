package de.niklas.backend.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.sql.Timestamp;

@Entity
@Table(name = "locations")
public class Location {

    @Id
    @Column(name = "id")
    private int id;

    @Column(name = "location")
    private String location;

    @CreationTimestamp
    @Column(name = "created")
    private Timestamp timestamp;

    public Location() {
    }

    public Location(int id, String location, Timestamp timestamp) {
        this.id = id;
        this.location = location;
        this.timestamp = timestamp;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }
}

package com.endava.spring.model;

import javax.persistence.*;
import java.util.List;

/**
 * Created by Nick on 11/19/2016.
 */
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String firstname;
    private String lastname;
    private String username;
    private String password;

    @OneToMany(mappedBy = "user")
    private List<City> cityList;

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstname;
    }

    public void setFirstName(String firstName) {
        this.firstname = firstName;
    }

    public String getLastName() {
        return lastname;
    }

    public void setLastName(String lastName) {
        this.lastname = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User(String firstName, String lastName, String username, String password) {

        this.firstname = firstName;
        this.lastname = lastName;
        this.username = username;
        this.password = password;
    }
}

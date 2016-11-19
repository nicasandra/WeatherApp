package com.endava.spring.service;

import com.endava.spring.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Nick on 11/19/2016.
 */

public interface UserService {
    public User create(User shop);

    public User delete(int id);

    public List<User> findAll();

    public User update(User shop);

    public User findById(int id);
}

package com.endava.spring.service;

import com.endava.spring.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Nick on 11/19/2016.
 */

@Service
public interface UserService {
    User create(User user);

    User delete(int id);

    List<User> findAll();

    User update(User user);

    User findById(int id);

    User findByUsernameAndPassword(String username, String password);
}

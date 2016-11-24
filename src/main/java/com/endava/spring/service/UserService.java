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

    List<User> findAll();

    User register(User user);

    User login(User user);

    User findOne(Integer id);
}

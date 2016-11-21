package com.endava.spring.service.impl;

import com.endava.spring.model.User;
import com.endava.spring.repository.UserRepository;
import com.endava.spring.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Nick on 11/19/2016.
 */

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserRepository userRepository;

    @Transactional
    public User create(User user) {
        User createdUser = user;
        return userRepository.save(user);
    }

    public User delete(int id) {
        return null;
    }

    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User update(User shop) {
        return null;
    }

    public User findById(int id) {
        return null;
    }

    public User findByUsernameAndPassword(String username, String password) {
        return userRepository.findByUsernameAndPassword(username, password);
    }


}

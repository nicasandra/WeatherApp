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

    public User register(User user) {
        List<User> userList = userRepository.findByEmail(user.getEmail());
        if (userList == null || userList.size() == 0) {
            return userRepository.save(user);
        }
        return null;
    }

    public User login(User user) {
        List<User> userList = userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
        if (userList != null && userList.size() > 0) {
            return userList.get(0);

        }
        return null;
    }
}

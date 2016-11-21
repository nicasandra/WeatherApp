package com.endava.spring.repository;

import com.endava.spring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Nick on 11/19/2016.
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByUsernameAndPassword(String username, String password);
}

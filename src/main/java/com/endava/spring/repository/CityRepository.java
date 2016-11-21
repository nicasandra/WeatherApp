package com.endava.spring.repository;

import com.endava.spring.model.City;
import com.endava.spring.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by nicasandra on 11/21/2016.
 */
public interface CityRepository extends JpaRepository<City, Integer> {
    List<City> findByUser_id(Integer id);
}

package com.endava.spring.repository;

import com.endava.spring.model.CityCache;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by nicasandra on 12/2/2016.
 */
public interface CityCacheRepository extends JpaRepository<CityCache, Integer> {
    List<CityCache> findByNameContaining(String name);
}

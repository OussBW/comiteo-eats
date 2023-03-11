<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends AbstractController
{
    /**
     * @Route("/{vueRouting}/{level1}/{level2}", name="app", defaults={"vueRouting"="","level1"="","level2"=""})
     */
    public function index(): Response
    {
        return $this->render('app/index.html.twig');
    }
}

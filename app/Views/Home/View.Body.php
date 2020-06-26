<body>
<div class="wrapper" id="wrapperDiv">
    <div class="sidebar" data-color="blue" data-active-color="danger">
        <!--
          Tip 1: You can change the color of the sidebar using: data-color="blue | green | orange | red | yellow"
         -->
        <div class="sidebar-wrapper ps-container ps-theme-default ps-active-x ps-active-y"
             data-ps-id="7bf8fbc5-e975-d0e8-31b9-7d34e953536d">
            <div class="user">
                <div class="photo">
                    <img src="{{Host}}public/images/logo-small.png">
                </div>
                <div class="info">
                    <a>
                      <span>
                        S3
                      </span>
                    </a>
                </div>
            </div>
            <ul class="nav">
                <li class="active">
                    <a href="">
                        <i class="nc-icon nc-app"></i>
                        <p class="">S3 Application</p>
                    </a>
                </li>
            </ul>
            <div style="width: 260px; left: 0px; bottom: 0px;">
                <div tabindex="0" style="left: 0px; width: 258px;">

                </div>
            </div>
            <div style="top: 0px; height: 670px; right: 0px;">
                <div tabindex="0" style="top: 0px; height: 620px;">

                </div>
            </div>
        </div>

    </div>
    <!--MAIN PANEL-->
    <div class="main-panel">

        <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
            <div class="container-fluid">
                <div class="navbar-wrapper">
                    <div class="navbar-minimize">
                        <button id="minimizeSidebar" class="btn btn-icon btn-round">
                            <i class="nc-icon nc-minimal-right text-center visible-on-sidebar-mini"></i>
                            <i class="nc-icon nc-minimal-left text-center visible-on-sidebar-regular"></i>
                        </button>
                    </div>
                    <div class="navbar-toggle">
                        <button type="button" class="navbar-toggler">
                            <span class="navbar-toggler-bar bar1"></span>
                            <span class="navbar-toggler-bar bar2"></span>
                            <span class="navbar-toggler-bar bar3"></span>
                        </button>
                    </div>
                    <a class="navbar-brand" href="javascript:;">S3 Image Upload APP</a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
                        aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                    <span class="navbar-toggler-bar navbar-kebab"></span>
                </button>
            </div>
        </nav>


        <!--CONTENT-->
        <div class="content">
            <div class="row">
                <div class="col-md-4">
                    <div class="card ">
                        <div class="card-header">
                            <h4 class="card-title">Regular Image</h4>
                        </div>
                        <div class="card-body ">
                            <div class="row">
                                <div class="col-md-2 col-sm-2"></div>
                                <div class="col-md-10 col-sm-10">
                                    <form id="s3Form" enctype="multipart/form-data">
                                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                                            <div class="fileinput-new thumbnail">
                                                <img src="{{Host}}public/images/image_placeholder.jpg" alt="...">
                                            </div>
                                            <div class="fileinput-preview fileinput-exists thumbnail"></div>
                                            <div id="image">
                                                <span class="btn btn-rose btn-round btn-file">
                                                  <span class="fileinput-new"> <i class="fas fa-images"></i> Select image</span>
                                                  <span class="fileinput-exists"> <i class="fas fa-exchange-alt"></i> Change</span>
                                                  <input type="file" name="image">
                                                </span>
                                                <a href="javascript:;" class="btn btn-danger btn-round fileinput-exists"
                                                   data-dismiss="fileinput"><i class="fa fa-times"></i> Remove</a>
                                                <a id="saveButton" class="btn btn-primary btn-round fileinput-exists" data-dismiss="fileinput"><i
                                                            class="fa fa-save"></i> Save</a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="card ">
                        <div class="card-header">
                            <h4 class="card-title"><i class="fas fa-images"></i> IMAGE THUMBNAIL</h4>
                        </div>
                        <div class="card-body ">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="thumbnail-div">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
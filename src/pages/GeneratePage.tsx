
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, RefreshCw, Sparkles, Crown, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const GeneratePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [originalImage, setOriginalImage] = useState<string>('');
  
  // Get file and style from navigation state
  const { file, style } = location.state || {};

  // 模拟AI图片生成的URLs
  const generateAIImageVariations = (originalImageUrl: string, styleId: string) => {
    // 基于风格生成不同的AI图片变体
    const styleVariations: { [key: string]: string[] } = {
      'qversion': [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face'
      ],
      'minimalist': [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b739?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face'
      ],
      'pixel': [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=400&h=400&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop&crop=face'
      ]
    };
    
    return styleVariations[styleId] || styleVariations['qversion'];
  };

  useEffect(() => {
    if (!file || !style) {
      navigate('/');
      return;
    }

    // Convert file to URL for preview
    const imageUrl = URL.createObjectURL(file);
    setOriginalImage(imageUrl);

    // Simulate AI generation process
    const simulateGeneration = () => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            // 生成基于原图和风格的AI图片
            const aiImages = generateAIImageVariations(imageUrl, style);
            setGeneratedImages(aiImages);
            toast({
              title: "生成完成！",
              description: `已生成${aiImages.length}张${getStyleInfo(style).name}风格的头像`,
            });
            return 100;
          }
          return prev + Math.random() * 12;
        });
      }, 300);

      return () => clearInterval(interval);
    };

    const cleanup = simulateGeneration();
    return cleanup;
  }, [file, style, navigate, toast]);

  const handleRegenerate = () => {
    setProgress(0);
    setIsGenerating(true);
    setGeneratedImages([]);
    
    // Restart generation process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          const aiImages = generateAIImageVariations(originalImage, style);
          setGeneratedImages(aiImages);
          toast({
            title: "重新生成完成！",
            description: `已生成${aiImages.length}张新的AI头像`,
          });
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 300);
  };

  const handleDownload = (imageUrl: string) => {
    // Check if it's a premium style
    const premiumStyles = ['cyberpunk', 'hanfu', 'seasons'];
    if (premiumStyles.includes(style)) {
      toast({
        title: "付费解锁",
        description: "该风格需要付费解锁，是否前往支付？",
        action: (
          <Button size="sm" onClick={() => console.log('Navigate to payment')}>
            立即购买
          </Button>
        ),
      });
      return;
    }

    // Simulate download for free styles
    toast({
      title: "下载开始",
      description: "高清头像正在下载到您的设备",
    });
  };

  const getStyleInfo = (styleId: string) => {
    const styleMap: { [key: string]: { name: string; isPremium: boolean } } = {
      'qversion': { name: 'Q版漫画', isPremium: false },
      'minimalist': { name: '简约线条', isPremium: false },
      'pixel': { name: '怀旧像素', isPremium: false },
      'cyberpunk': { name: '赛博霓虹', isPremium: true },
      'hanfu': { name: '古风汉服', isPremium: true },
      'seasons': { name: '24节气系列', isPremium: true }
    };
    return styleMap[styleId] || { name: '未知风格', isPremium: false };
  };

  const styleInfo = getStyleInfo(style);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white shadow-sm">
        <Button variant="ghost" onClick={() => navigate('/')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>
        <div className="text-center">
          <h2 className="font-semibold flex items-center">
            {styleInfo.isPremium && <Crown className="w-4 h-4 mr-1 text-yellow-500" />}
            {styleInfo.name}
          </h2>
        </div>
        <Button variant="ghost" onClick={() => navigate('/profile')}>
          我的
        </Button>
      </div>

      {/* Main Content with Tabs */}
      <div className="flex-1 pb-20">
        <Tabs defaultValue="generate" className="h-full flex flex-col">
          {/* Tab Content */}
          <div className="flex-1 max-w-md mx-auto space-y-6 p-4">
            <TabsContent value="generate" className="space-y-6 mt-0">
              {/* Progress Section */}
              {isGenerating && (
                <Card>
                  <CardContent className="p-4">
                    <div className="text-center space-y-3">
                      <Sparkles className="w-8 h-8 mx-auto text-purple-600 animate-spin" />
                      <h3 className="font-medium">AI正在分析您的照片并生成专属头像...</h3>
                      <Progress value={progress} className="w-full" />
                      <p className="text-sm text-gray-600">{Math.round(progress)}% 完成</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Image Comparison */}
              <div className="space-y-4">
                {/* Original Image */}
                <Card>
                  <CardContent className="p-3">
                    <h4 className="text-sm font-medium mb-2 text-center">原图</h4>
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 max-w-48 mx-auto">
                      {originalImage && (
                        <img 
                          src={originalImage} 
                          alt="Original" 
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Generated Images Grid */}
                <Card>
                  <CardContent className="p-3">
                    <h4 className="text-sm font-medium mb-3 text-center">
                      AI生成结果 ({generatedImages.length}/3)
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
                          {isGenerating ? (
                            <div className="flex items-center justify-center h-full">
                              <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          ) : generatedImages[index] ? (
                            <>
                              <img 
                                src={generatedImages[index]} 
                                alt={`Generated ${index + 1}`} 
                                className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => handleDownload(generatedImages[index])}
                              />
                              <Button
                                size="sm"
                                className="absolute bottom-1 right-1 h-6 w-6 p-0"
                                onClick={() => handleDownload(generatedImages[index])}
                              >
                                <Download className="w-3 h-3" />
                              </Button>
                            </>
                          ) : (
                            <div className="flex items-center justify-center h-full text-xs text-gray-400">
                              待生成
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              {!isGenerating && (
                <div className="space-y-3">
                  <Button 
                    onClick={handleRegenerate}
                    variant="outline"
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重新生成更多变体
                  </Button>

                  {styleInfo.isPremium && (
                    <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                      <CardContent className="p-3">
                        <div className="text-center space-y-2">
                          <Crown className="w-6 h-6 mx-auto text-yellow-600" />
                          <p className="text-sm font-medium text-yellow-800">
                            该风格为付费内容
                          </p>
                          <p className="text-xs text-yellow-700">
                            开通会员享受无限生成特权
                          </p>
                          <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                            立即开通会员
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile" className="space-y-6 mt-0">
              <div className="text-center py-8">
                <User className="w-16 h-16 mx-auto mb-4 text-purple-600" />
                <h2 className="text-xl font-semibold mb-2">个人中心</h2>
                <p className="text-gray-600 mb-6">管理您的账户和生成历史</p>
                <Button 
                  onClick={() => navigate('/profile')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  进入个人中心
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Fixed Bottom Tab Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <Tabs defaultValue="generate" className="max-w-md mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-transparent rounded-none h-16">
            <TabsTrigger value="generate" className="flex flex-col items-center space-y-1 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              <Sparkles className="w-5 h-5" />
              <span className="text-xs">生成</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex flex-col items-center space-y-1 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
              <User className="w-5 h-5" />
              <span className="text-xs">我的</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default GeneratePage;
